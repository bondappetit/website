import { useAsyncRetry } from 'react-use';

import { useIssuerContract, useNetworkConfig, BN } from 'src/common';

export const useIssuerBalance = () => {
  const issuerContract = useIssuerContract();

  const networkConfig = useNetworkConfig();

  return useAsyncRetry(async () => {
    if (!issuerContract) return;

    const issuerBalance = await issuerContract.methods.balance().call();

    return new BN(issuerBalance).div(
      new BN(10).pow(networkConfig.assets.Stable.decimals)
    );
  }, [issuerContract, networkConfig]);
};
