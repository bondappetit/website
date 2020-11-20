import React from 'react';
import Web3 from 'web3';
import { provider as Web3Provider } from 'web3-core';
import { Web3ReactProvider } from '@web3-react/core';

import { config } from 'src/config';

const getLibrary = (provider: Web3Provider): Web3 => {
  const library = new Web3(
    config.IS_DEV
      ? provider
      : new Web3.providers.HttpProvider(config.MAINNET_URL)
  );

  return library;
};

export const Web3ReactProviderWithLibrary: React.FC = (props) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {props.children}
    </Web3ReactProvider>
  );
};
