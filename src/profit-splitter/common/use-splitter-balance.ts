import { useCallback, useEffect, useReducer } from 'react';
import { AbiItem } from 'web3-utils';
import IERC20 from '@bondappetit/networks/abi/IERC20.json';
import { Ierc20 } from 'src/generate/IERC20';
import BN from 'bignumber.js';

import {
  useNetworkConfig,
  useDynamicContract,
  useBalance,
  Network
} from 'src/common';
import { NonPayableTransactionObject } from 'src/generate/types';

type InitialState = {
  asset?: Network['assets'][number];
  tokenContract?: Ierc20;
  tokenBalance?: BN;
};

const initialState: InitialState = {
  asset: undefined,
  tokenContract: undefined,
  tokenBalance: undefined
};

const reducer = (_: InitialState, nextValue: InitialState) => nextValue;

export const useSplitterBalance = (
  callback?: () => NonPayableTransactionObject<string>,
  accountAddress?: string
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const networkConfig = useNetworkConfig();

  const getBalance = useBalance();
  const getContract = useDynamicContract<Ierc20>();

  const handleGetBalance = useCallback(async () => {
    if (!callback || !networkConfig || !accountAddress) return;

    const tokenAddress = await callback().call();
    const asset = Object.values(networkConfig.assets).find(
      ({ address }) => address === tokenAddress
    );

    const tokenContract = getContract(tokenAddress, IERC20.abi as AbiItem[]);
    const tokenBalance = await getBalance({
      tokenAddress,
      accountAddress
    });

    dispatch({
      asset,
      tokenContract,
      tokenBalance: asset
        ? tokenBalance.div(new BN(10).pow(asset.decimals))
        : new BN(0)
    });
  }, [getContract, networkConfig, getBalance, accountAddress, callback]);

  useEffect(() => {
    handleGetBalance();
  }, [handleGetBalance, networkConfig]);

  return state;
};
