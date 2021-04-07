import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { useAsyncFn } from 'react-use';
import { useEffect, useRef } from 'react';

import type { Staking } from 'src/generate/Staking';
import { dateUtils, BN, useIntervalIfHasAccount } from 'src/common';

const DATE_FORMAT = 'HH:mm:ss on MMMM DD';

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

    const date = dateUtils.format(dateUtils.addSeconds(seconds), DATE_FORMAT);

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

  useIntervalIfHasAccount(getState);

  return state;
};
