import { useCallback, useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import { useGovStakingContract } from 'src/common';

export const useEarned = () => {
  const [state, setState] = useState('');
  const { account } = useWeb3React<Web3>();
  const govStakingContract = useGovStakingContract();

  const handleGetEarned = useCallback(async () => {
    const earned = account
      ? await govStakingContract.methods.earned(account).call({ from: account })
      : '0';

    setState(earned);
  }, [account, govStakingContract]);

  useEffect(() => {
    handleGetEarned();
  }, [handleGetEarned]);

  return state;
};
