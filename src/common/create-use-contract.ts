import { useMemo } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import type { AbiItem } from 'web3-utils';
import type { ContractOptions } from 'web3-eth-contract';
import networks from '@bondappetit/networks';

import { useNetworkConfig } from './use-network-config';

type Callback = (
  network: Network
) => {
  abi: AbiItem[] | AbiItem;
  address?: string;
  options?: ContractOptions;
};

const web3 = new Web3(Web3.givenProvider);

export type Network = typeof networks[keyof typeof networks];

export const createUseContract = <T>(cb: Callback) => () => {
  const { library } = useWeb3React<Web3>();
  const networkConfig = useNetworkConfig();
  const web3OrLib = library ?? web3;

  return useMemo(() => {
    if (!web3OrLib || !networkConfig) return null;

    const contractParams = cb(networkConfig);

    return (new web3OrLib.eth.Contract(
      contractParams.abi,
      contractParams.address,
      contractParams.options
    ) as unknown) as T;
  }, [web3OrLib, networkConfig]);
};
