import { useWeb3React } from '@web3-react/core';
import { useCallback, useRef } from 'react';
import type { Ierc20 } from 'src/generate/IERC20';
import Web3 from 'web3';
import IERC20 from '@bondappetit/networks/abi/IERC20.json';
import { AbiItem } from 'web3-utils';
import BN from 'bignumber.js';

import { useDynamicContract } from './create-use-contract';

const WETH = 'WETH';

type GetBalanceOptions = {
  tokenName?: string;
  tokenAddress?: string;
  accountAddress?: string | null;
};

export const useBalance = () => {
  const { account, library } = useWeb3React<Web3>();
  const balanceRef = useRef('');
  const getIERC20Contract = useDynamicContract<Ierc20>({
    abi: IERC20.abi as AbiItem[]
  });

  const handleGetWETHBalance = useCallback(
    (accountAddress = account) => {
      if (!accountAddress || !library) return '';

      return library.eth.getBalance(accountAddress);
    },
    [library, account]
  );

  const handleGetIERC20Balance = useCallback(
    (address?: string, accountAddress = account) => {
      if (!accountAddress) return '';

      const contract = getIERC20Contract(address);

      return contract.methods.balanceOf(accountAddress).call();
    },
    [getIERC20Contract, account]
  );

  const getBalance = useCallback(
    async (options: GetBalanceOptions) => {
      if (options.tokenName === WETH) {
        balanceRef.current = await handleGetWETHBalance(options.accountAddress);
      }

      if (options.tokenName !== WETH) {
        balanceRef.current = await handleGetIERC20Balance(
          options.tokenAddress,
          options.accountAddress
        );
      }

      return new BN(balanceRef.current);
    },
    [handleGetWETHBalance, handleGetIERC20Balance]
  );

  return getBalance;
};
