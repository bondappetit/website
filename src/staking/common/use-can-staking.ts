import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { useAsyncFn, useInterval } from 'react-use';

import type { Staking } from 'src/generate/Staking';
import { dateUtils, BN } from 'src/common';
import { useEffect, useRef } from 'react';

export const useCanStaking = (stakingContract?: Staking) => {
  const { library } = useWeb3React<Web3>();
  const stakingContractRef = useRef(stakingContract);

  const [state, getState] = useAsyncFn(async () => {
    if (!stakingContractRef.current) return;

    const result = await stakingContractRef.current.methods
      .stakingEndBlock()
      .call();

    const currentBlockNumber = new BN(
      (await library?.eth.getBlockNumber()) ?? 0
    );

    const stakingEndBlock = new BN(result ?? 0);

    const seconds = stakingEndBlock
      .minus(currentBlockNumber)
      .multipliedBy(15)
      .toNumber();

    const date = dateUtils.format(
      dateUtils.addSeconds(seconds),
      'HH:mm:ss on MMMM DD'
    );

    const cant =
      currentBlockNumber.isGreaterThan(stakingEndBlock) &&
      stakingEndBlock.isGreaterThan(0);

    return {
      cant,
      date,
      stakingEndBlock
    };
  }, [library]);

  useEffect(() => {
    if (stakingContract) {
      getState();
    }
  }, [stakingContract, getState]);

  useInterval(getState, 15000);

  return state;
};
