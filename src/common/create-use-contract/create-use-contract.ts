import { useMemo } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import type { AbiItem } from 'web3-utils';
import type { ContractOptions, Contract } from 'web3-eth-contract';
import networks from '@bondappetit/networks';

import { config } from 'src/config';
import { useNetworkConfig } from '../use-network-config';

type Options = {
  abi: AbiItem[] | AbiItem;
  address?: string;
  options?: ContractOptions;
};

type Callback = (network: Network) => Options;

const web3 = new Web3(
  config.IS_DEV
    ? Web3.givenProvider
    : new Web3.providers.HttpProvider(config.MAINNET_URL)
);

export type Network = typeof networks[keyof typeof networks];

const getContractOptions = (
  cb: Callback | Options,
  networkConfig?: Network
) => {
  if (!networkConfig && typeof cb === 'object') {
    return cb;
  }

  if (networkConfig && typeof cb === 'function') {
    return cb(networkConfig);
  }
};

export const createUseContract = <T = Contract>(
  cb: Callback | Options
) => () => {
  const { library } = useWeb3React<Web3>();
  const networkConfig = useNetworkConfig();
  const web3OrLib = library ?? web3;

  return useMemo(() => {
    const contractOptions = getContractOptions(cb, networkConfig);

    if (!web3OrLib || !contractOptions) return null;

    return (new web3OrLib.eth.Contract(
      contractOptions.abi,
      contractOptions.address,
      contractOptions.options
    ) as unknown) as T;
  }, [web3OrLib, networkConfig]);
};
