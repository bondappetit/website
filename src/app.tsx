import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { createNanoEvents } from 'nanoevents';

import { useEagerConnect, useInactiveListener } from './web3/hooks';
import Router from './router';

export const emmiter = createNanoEvents();

export const App: React.FC = () => {
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);

  const { chainId } = useWeb3React();

  useEffect(() => {
    if (chainId) {
      emmiter.emit('chainChanged', chainId);
    }
  }, [chainId]);

  return <Router />;
};
