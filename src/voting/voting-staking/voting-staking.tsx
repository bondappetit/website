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

  const totalSupplySum = getSum(stakingTotal.value?.totalSupplySum);

  const leftTokens = getSum(
    stakingTotal.value?.totalSupplySum.minus(
      stakingTotal.value?.distributedSum ?? ''
    )
  );

  return (
    <VotingInfoCard
      title="Earn by staking"
      subtitle={`${leftTokens} of ${totalSupplySum} BAG left to earn`}
      loading={stakingTotal.loading}
      onClick={() => history.push(URLS.staking.list)}
      buttonTitle="Earn BAG"
      percent={stakingTotal.value?.percent.toString(10)}
      description={`Earn governance tokens as rewards for supporting the protocol’s activities.
      Buy USDap, stake your assets in liquidity pools with a 6-month lock period, and receive BAGs in return.`}
    />
  );
};
