import { useAsyncRetry } from 'react-use';

import { useStakingConfig } from 'src/staking-config';
import { useStakingRewardHistory } from 'src/common';

export const useStakingTotal = () => {
  const { stakingConfig } = useStakingConfig();
  const getStakingRewardHistory = useStakingRewardHistory();

  return useAsyncRetry(async () => {
    const history = await getStakingRewardHistory({
      addresses: Object.values(stakingConfig).map(
        ({ configAddress }) => configAddress
      )
    });

    return history.data.stakingList;
  }, [stakingConfig]);
};
