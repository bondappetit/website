import { useCallback, useMemo, useRef } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import type { AbiItem } from 'web3-utils';
import type { ContractOptions } from 'web3-eth-contract';
import networks from '@bondappetit/networks';

import { config } from 'src/config';
import { useNetworkConfig } from './use-network-config';

type ContractParameters = {
  abi: AbiItem[] | AbiItem;
  address?: string;
  options?: ContractOptions;
};

type Callback = (network: Network) => ContractParameters;

const web3 = new Web3(
  config.IS_DEV
    ? Web3.givenProvider
    : new Web3.providers.HttpProvider(config.MAINNET_URL)
);

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

export const useDynamicContract = <T>(
  contractParameters: ContractParameters
) => {
  const { library } = useWeb3React<Web3>();
  const web3OrLib = library ?? web3;
  const contract = useRef<T | null>(null);

  const handleGetContract = useCallback(
    (address?: string) => {
      contract.current = (new web3OrLib.eth.Contract(
        contractParameters.abi,
        address
      ) as unknown) as T;

      return contract.current;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [web3OrLib]
  );

  return handleGetContract;
};
