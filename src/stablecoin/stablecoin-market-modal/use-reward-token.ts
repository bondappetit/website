import { useAsyncRetry } from 'react-use';

import { BN, useMarketContract, useNetworkConfig } from 'src/common';

type Options = {
  currency: string;
  payment: string | number;
};

export const useRewardToken = (options: Options) => {
  const marketContract = useMarketContract();
  const networkConfig = useNetworkConfig();

  const { currency, payment } = options;

  const state = useAsyncRetry(async () => {
    const currentAsset = networkConfig.assets[currency];

    if (!currentAsset || !currency || !payment) return;

    const reward = await marketContract.methods
      .price(currentAsset.address, payment)
      .call();

    const product = new BN(reward.product);

    const rewardGov = new BN(reward.reward);

    return {
      product,
      rewardGov: rewardGov.div(product).multipliedBy(100)
    };
  }, [marketContract.methods, currency, payment]);

  return state;
};
