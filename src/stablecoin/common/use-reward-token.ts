import { useAsyncRetry } from 'react-use';

import { BN, useMarketContract, useNetworkConfig } from 'src/common';

type Options = {
  currency: string;
  payment: string | number;
};

export const useRewardToken = (options?: Options) => {
  const marketContract = useMarketContract();
  const networkConfig = useNetworkConfig();

  const { currency = networkConfig.assets.USDC.symbol, payment = 1 } =
    options ?? {};

  const state = useAsyncRetry(async () => {
    const currentAsset = networkConfig.assets[currency];

    if (!currentAsset || !currency || !payment) return;

    const paymentBN = new BN(payment).multipliedBy(
      new BN(10).pow(currentAsset.decimals)
    );

    const reward = await marketContract.methods
      .price(currentAsset.address, paymentBN.toString(10))
      .call();

    const div = new BN(10).pow(networkConfig.assets.Governance.decimals);

    const product = new BN(reward.product).div(div);

    const rewardGov = new BN(reward.reward).div(div);

    return {
      product,
      rewardGov,
      rewardPercent: rewardGov.div(product).multipliedBy(100)
    };
  }, [marketContract.methods, currency, payment]);

  return state;
};
