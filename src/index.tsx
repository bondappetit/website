import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
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
import smoothscroll from 'smoothscroll-polyfill';

import { ThemeProvider, globalStyles, ModalProvider } from './common';
import { App } from './app';
import { config } from './config';
import { Web3Provider } from './web3/web3-provider';
import { ErrorBoundary, Sentry } from './error-boundary';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

jss.createStyleSheet(normalize).attach();
jss.createStyleSheet(globalStyles).attach();
smoothscroll.polyfill();

const chainIdLink = setContext((_, { headers }) => ({
  headers: {
    'chain-id': config.CHAIN_IDS[0],
    ...headers
  }
}));

const httpLink = new HttpLink({
  uri: config.API_URL
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: chainIdLink.concat(httpLink),
  connectToDevTools: config.IS_DEV
});

Sentry.init();

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Web3Provider>
        <ApolloProvider client={client}>
          <JssProvider jss={jss}>
            <ThemeProvider>
              <ErrorBoundary>
                <ModalProvider>
                  <App />
                </ModalProvider>
              </ErrorBoundary>
            </ThemeProvider>
          </JssProvider>
        </ApolloProvider>
      </Web3Provider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
if (!config.IS_DEV) {
  serviceWorkerRegistration.register({
    onUpdate: (registration) => {
      registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  });
}
