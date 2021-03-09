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

  return useAsyncRetry(async () => {
    const currentAsset = Object.values(networkConfig.assets).find(
      ({ symbol }) => symbol === currency
    );

    if (!currentAsset) return;

    const currentAssetDiv = new BN(10).pow(currentAsset.decimals);

    const paymentBN = new BN(payment).multipliedBy(currentAssetDiv);

    if (!marketContract) return;

    const reward = await marketContract.methods
      .price(currentAsset.address, paymentBN.toString(10))
      .call();

    const govDiv = new BN(10).pow(networkConfig.assets.Governance.decimals);

    const product = new BN(reward.product).div(govDiv);

    const rewardGov = new BN(reward.reward).div(govDiv);

    return {
      product,
      paymentBN,
      rewardGov,
      rewardPercent: rewardGov.div(product).multipliedBy(100)
    };
  }, [marketContract, currency, payment]);
};
