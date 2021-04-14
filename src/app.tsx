import React, { useLayoutEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useApolloClient } from '@apollo/client';

import { useEagerConnect, useInactiveListener } from './web3/hooks';
import Router from './router';
import { chainIdVar } from './cache';

export const App: React.FC = () => {
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);

  const { chainId } = useWeb3React();

  const client = useApolloClient();

  useLayoutEffect(() => {
    if (chainId !== undefined) {
      chainIdVar(chainId);

      client.reFetchObservableQueries();
    }
  }, [chainId, client]);

  return <Router />;
};
