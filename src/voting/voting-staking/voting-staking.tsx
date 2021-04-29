import React from 'react';
import { useHistory } from 'react-router-dom';
import { BN, StakingRewardHistory } from 'src/common';

import { URLS } from 'src/router/urls';
import { VotingInfoCard } from '../common';
import { useStakingTotal } from './use-staking-total';

const getRewardHistorySum = (
  [sumReward, sumEarned]: [BN, BN],
  { totalReward, totalEarned }: StakingRewardHistory
): [BN, BN] => {
  return [sumReward.plus(totalReward), sumEarned.plus(totalEarned)];
};

export const VotingStaking: React.VFC = () => {
  const history = useHistory();
  const stakingRewardHistory = useStakingTotal();
  let sum = { leftTokens: new BN(0), totalSupplySum: new BN(0) };
  if (stakingRewardHistory.value) {
    sum = stakingRewardHistory.value.reduce(
      (
        { leftTokens, totalSupplySum },
        { rewardForDurationFloat, earnedFloat, rewardHistory }
      ) => {
        const [
          totalEarnedSum,
          totalRewardSum
        ] = rewardHistory.reduce(getRewardHistorySum, [new BN(0), new BN(0)]);

        return {
          leftTokens: leftTokens.plus(earnedFloat).plus(totalEarnedSum),
          totalSupplySum: totalSupplySum
            .plus(rewardForDurationFloat)
            .plus(totalRewardSum)
        };
      },
      sum
    );
  }
  const totalSupplySum = sum.totalSupplySum.toFormat(0);
  const leftTokens = sum.leftTokens.toFormat(0);
  let percent = new BN(0);
  if (sum.totalSupplySum.gt(0)) {
    percent = sum.leftTokens.div(sum.totalSupplySum).multipliedBy(100);
  }

  return (
    <VotingInfoCard
      title="Earn by staking"
      subtitle={`${leftTokens} of ${totalSupplySum} BAG left to earn`}
      loading={stakingRewardHistory.loading}
      onClick={() => history.push(URLS.staking.list)}
      buttonTitle="Earn BAG"
      percent={percent.toString(10)}
      description={
        'Earn governance tokens as rewards for supporting the protocol’s activities. ' +
        'Buy USDap, stake your assets in liquidity pools and receive BAGs in return.'
      }
    />
  );
};
