import { useLazyQuery } from './use-query';

const url = 'https://cache.bondappetit.io/api';

const QUERY = `
  query($addresses:[AddressType!]!) {
    stakingList(
      filter:{address:$addresses}
    ) {
      rewardForDurationFloat
      earnedFloat
      rewardHistory {
        totalReward
        totalEarned
      }
    }
  }
`;

export type StakingRewardHistory = {
  totalReward: string;
  totalEarned: string;
};

export type StakingReward = {
  rewardForDurationFloat: string;
  earnedFloat: string;
  rewardHistory: StakingRewardHistory[];
};

export type StakingRewardPayload = {
  data: {
    stakingList: StakingReward[];
  };
};

export const useStakingRewardHistory = () =>
  useLazyQuery<StakingRewardPayload>(url, {
    query: QUERY
  });
