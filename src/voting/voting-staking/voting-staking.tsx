import React from 'react';
import { useHistory } from 'react-router-dom';
import { BN } from 'src/common';

import { URLS } from 'src/router/urls';
import { VotingInfoCard } from '../common';
import { useStakingTotal } from './use-staking-total';

const getSum = (sum?: BN) => {
  if (!sum) return '0';

  return sum.isLessThan(0) || !sum.isFinite() || sum.isNaN()
    ? '0'
    : sum.toFormat(0);
};

export const VotingStaking: React.VFC = () => {
  const history = useHistory();

  const stakingTotal = useStakingTotal();

  const distributedSum = getSum(stakingTotal.value?.distributedSum);
  const totalSupplySum = getSum(stakingTotal.value?.totalSupplySum);

  return (
    <VotingInfoCard
      title="Earn BAG by Staking"
      subtitle={`${distributedSum} of ${totalSupplySum} BAG left to earn`}
      loading={stakingTotal.loading}
      onClick={() => history.push(URLS.staking.list)}
      buttonTitle="Earn BAG"
      percent={stakingTotal.value?.percent.toString(10)}
      description={`You can earn governance token as reward for supporting protocol activities.
      Buy USDap, stake your assets in liquidity pools with 3-month lock periods and earn BAG as rewards.`}
    />
  );
};
