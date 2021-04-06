import { useAsyncRetry } from 'react-use';

import { useStakingConfig } from 'src/staking-config';
import { useStakingContracts } from 'src/staking';
import { BN, useLibrary, useNetworkConfig } from 'src/common';

export const useStakingTotal = () => {
  const stakingConfig = useStakingConfig();
  const getStakingContract = useStakingContracts();

  const networkConfig = useNetworkConfig();

  const library = useLibrary();

  return useAsyncRetry(async () => {
    const staking = Object.values(stakingConfig)
      .map((stakingConfigItem) => {
        const stakingContractMethods = getStakingContract(
          stakingConfigItem.contractName
        )?.methods;

        return {
          lastUpdateBlock: stakingContractMethods?.lastUpdateBlock().call,
          getRewardsDuration: stakingContractMethods?.rewardsDuration().call,
          periodFinish: stakingContractMethods?.periodFinish().call,
          rewardRate: stakingContractMethods?.rewardRate().call,
          getRewardForDuration: stakingContractMethods?.getRewardForDuration()
            .call
        };
      })
      .map(
        async ({
          lastUpdateBlock,
          getRewardsDuration,
          periodFinish,
          rewardRate,
          getRewardForDuration
        }) => {
          const [
            stakingLastUpdateBlock = '0',
            rewardsDuration = '0',
            stakingPeriodFinish = '0',
            stakingRewardRate = '0',
            rewardForDuration = '0'
          ] = await Promise.all([
            lastUpdateBlock?.(),
            getRewardsDuration?.(),
            periodFinish?.(),
            rewardRate?.(),
            getRewardForDuration?.()
          ]);

          const currentBlockNumber = (await library?.eth.getBlockNumber()) ?? 0;
          const startDistributionBlock = new BN(stakingPeriodFinish).minus(
            rewardsDuration
          );

          const distributed = new BN(currentBlockNumber)
            .minus(startDistributionBlock)
            .multipliedBy(stakingRewardRate);

          return {
            totalSupply: rewardForDuration,
            distributed,
            currentBlockNumber: new BN(currentBlockNumber),
            lastUpdateBlock: new BN(stakingLastUpdateBlock),
            periodFinish: new BN(stakingPeriodFinish),
            rewardRate: new BN(stakingRewardRate)
          };
        }
      );

    const info = (await Promise.all(staking)).reduce(
      (
        acc,
        {
          lastUpdateBlock,
          currentBlockNumber,
          periodFinish,
          distributed,
          totalSupply
        }
      ) => {
        if (
          lastUpdateBlock.eq(0) ||
          currentBlockNumber.isGreaterThan(periodFinish)
        ) {
          return acc;
        }

        return {
          distributedSum: acc.distributedSum.plus(distributed),
          totalSupplySum: acc.totalSupplySum.plus(totalSupply)
        };
      },
      {
        distributedSum: new BN(0),
        totalSupplySum: new BN(0)
      }
    );

    const percent = new BN(info.distributedSum)
      .div(info.totalSupplySum)
      .multipliedBy(100);

    return {
      distributedSum: info.distributedSum.div(
        new BN(10).pow(networkConfig.assets.Governance.decimals)
      ),
      totalSupplySum: info.totalSupplySum.div(
        new BN(10).pow(networkConfig.assets.Governance.decimals)
      ),
      percent: percent.isFinite() ? percent : new BN(0)
    };
  }, [stakingConfig, library, networkConfig]);
};
