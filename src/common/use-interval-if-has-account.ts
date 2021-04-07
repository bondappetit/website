import { useWeb3React } from '@web3-react/core';
import { useInterval } from 'react-use';

const noop = () => {};

export const useIntervalIfHasAccount = (cb: () => void) => {
  const { account = null } = useWeb3React();

  return useInterval(account ? cb : noop, 15000);
};
