import { useState, useCallback, useEffect } from 'react';

import { useStableCoinContract } from 'src/common';

export const useStableCoinBalance = () => {
  const [state, setState] = useState('');

  const stableCoinContract = useStableCoinContract();

  const handleGetStableCoinBalance = useCallback(async () => {
    const stableCoinBalance = await stableCoinContract.methods
      .totalSupply()
      .call();

    setState(stableCoinBalance);
  }, [stableCoinContract]);

  useEffect(() => {
    handleGetStableCoinBalance();
  }, [handleGetStableCoinBalance]);

  return state;
};
