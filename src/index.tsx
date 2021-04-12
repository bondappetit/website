import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import { provider as Web3Provider } from 'web3-core';
import { jss, JssProvider } from 'react-jss';
import normalize from 'normalize-jss';
import 'typeface-epilogue';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { ThemeProvider, globalStyles } from './common';
import { App, emmiter } from './app';
import { ErrorBoundary } from './error-boundary';
import { config } from './config';

jss.createStyleSheet(normalize).attach();
jss.createStyleSheet(globalStyles).attach();

const getLibrary = (provider: Web3Provider): Web3 => {
  const library = new Web3(provider);

  return library;
};

let chainId = '';

const chainIdLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'chain-id': chainId
    }
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: chainIdLink.concat(
    new HttpLink({
      uri: config.API_URL
    })
  ),
  connectToDevTools: config.IS_DEV
});

emmiter.on('chainChanged', (newChainId) => {
  chainId = newChainId;

  console.log(chainId);

  client.reFetchObservableQueries(true);
});

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <ApolloProvider client={client}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <JssProvider jss={jss}>
            <ThemeProvider>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </ThemeProvider>
          </JssProvider>
        </Web3ReactProvider>
      </ApolloProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
