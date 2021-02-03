import { useCallback, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import type { Staking } from 'src/generate/Staking';
import { dateUtils, BN, useTimeoutInterval } from 'src/common';

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
      ? dateUtils.format(dateUtils.addSeconds(seconds), 'HH:mm:ss MMMM DD')
      : '';

    const greaterThan = staking
      ? currentBlockNumber.isGreaterThan(endStakingBlockNumber)
      : endStakingBlockNumber.isGreaterThan(currentBlockNumber);

    const can = endStakingBlockNumberGreaterZero && greaterThan;

    setState({
      can,
      date,
      blockNumber: endStakingBlockNumber.toString(10)
    });
  }, [stakingContract, staking, library]);

  useTimeoutInterval(handleStakingBlock, 15000);

  return state;
};
