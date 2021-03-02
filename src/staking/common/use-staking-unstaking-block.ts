import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { useAsyncFn } from 'react-use';

import type { Staking } from 'src/generate/Staking';
import { dateUtils, BN, useTimeoutInterval } from 'src/common';

export const useStakingUnstakingBlock = (
  stakingContract?: Staking,
  staking = true
) => {
  const { library } = useWeb3React<Web3>();

  const [state, handleStakingBlock] = useAsyncFn(async () => {
    if (!stakingContract) return;

    const stakingMethod = staking
      ? stakingContract.methods.stakingEndBlock()
      : stakingContract.methods.unstakingStartBlock();

    const result = await stakingMethod?.call();

    const currentBlockNumber = new BN(
      (await library?.eth.getBlockNumber()) ?? 0
    );

    const endStakingBlockNumber = new BN(result ?? 0);

    const seconds = endStakingBlockNumber
      .minus(currentBlockNumber)
      .multipliedBy(15)
      .toNumber();

    const endStakingBlockNumberGreaterZero = endStakingBlockNumber.isGreaterThan(
      0
    );

    const date = endStakingBlockNumberGreaterZero
      ? dateUtils.format(dateUtils.addSeconds(seconds), 'HH:mm:ss on MMMM DD')
      : '';

    const greaterThan = staking
      ? currentBlockNumber.isGreaterThan(endStakingBlockNumber)
      : endStakingBlockNumber.isGreaterThan(currentBlockNumber);

    const can = endStakingBlockNumberGreaterZero && greaterThan;

    return {
      can,
      date,
      blockNumber: endStakingBlockNumber.toString(10)
    };
  }, [stakingContract, staking, library]);

  useTimeoutInterval(handleStakingBlock, 15000, stakingContract);

  return state;
};
