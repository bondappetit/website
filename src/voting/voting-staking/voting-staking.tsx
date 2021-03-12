import React from 'react';
import { useHistory } from 'react-router-dom';

import { URLS } from 'src/router/urls';
import { VotingInfoCard } from '../common';
import { useStakingTotal } from './use-staking-total';

export const VotingStaking: React.VFC = () => {
  const history = useHistory();

  const stakingTotal = useStakingTotal();

  const distributedSum = stakingTotal.value?.distributedSum.toFixed(0) ?? '0';
  const totalSupplySum = stakingTotal.value?.totalSupplySum.toFixed(0) ?? '0';

  return (
    <VotingInfoCard
      title="Earn BAG by Staking"
      subtitle={`${distributedSum} of ${totalSupplySum} BAG remained to earn`}
      loading={stakingTotal.loading}
      onClick={() => history.push(URLS.staking.list)}
      buttonTitle="Earn BAG"
      percent={stakingTotal.value?.percent.toString(10)}
      description={`You can earn governance token as reward for
        supporting protocol activities.
        Buy USDap, stake your assets in liquidity pools with 3-month
        lock period and earn BAG as reward.`}
    />
  );
};
