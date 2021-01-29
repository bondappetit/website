import { useCallback, useEffect, useState } from 'react';
import BN from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import type { Staking } from 'src/generate/Staking';
import { dateUtils } from 'src/common';

export const useStakingUnstakingBlock = (
  stakingContract?: Staking,
  staking = true
) => {
  const [state, setState] = useState({
    can: false,
    date: '',
    blockNumber: ''
  });

  const { library } = useWeb3React<Web3>();

  const handleStakingBlock = useCallback(async () => {
    const stakingMethod = staking
      ? stakingContract?.methods.stakingEndBlock()
      : stakingContract?.methods.unstakingStartBlock();

    const result = await stakingMethod?.call();

    const currentBlockNumber = new BN(
      (await library?.eth.getBlockNumber()) ?? 0
    );

    const endStakingBlockNumber = new BN(result ?? 0);

    const seconds = endStakingBlockNumber
      .minus(currentBlockNumber)
      .multipliedBy(15)
      .toNumber();

    const endStakingBlockNumberGreaterZero = endStakingBlockNumber.isGreaterThan(
      0
    );

    const date = endStakingBlockNumberGreaterZero
      ? dateUtils.format(dateUtils.addSeconds(seconds), 'YYYY-MM-DD HH:mm:ss')
      : '';

    const can =
      endStakingBlockNumberGreaterZero ||
      (currentBlockNumber.isGreaterThan(endStakingBlockNumber) &&
        endStakingBlockNumberGreaterZero);

    setState({ can, date, blockNumber: endStakingBlockNumber.toString(10) });
  }, [stakingContract, staking, library]);

  useEffect(() => {
    handleStakingBlock();
  }, [handleStakingBlock]);

  return state;
};
