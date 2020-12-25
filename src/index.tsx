import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import { provider as Web3Provider } from 'web3-core';
import { jss, JssProvider } from 'react-jss';
import normalize from 'normalize-jss';
import 'typeface-epilogue';
import { ToastProvider } from 'react-toast-notifications';

import { ThemeProvider, globalStyles } from './common';
import { App } from './app';
import { ErrorBoundary } from './error-boundary/error-boundary';

jss.createStyleSheet(normalize).attach();
jss.createStyleSheet(globalStyles).attach();

const getLibrary = (provider: Web3Provider): Web3 => {
  const library = new Web3(provider);

  return library;
};

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <JssProvider jss={jss}>
          <ThemeProvider>
            <ErrorBoundary>
              <ToastProvider>
                <App />
              </ToastProvider>
            </ErrorBoundary>
          </ThemeProvider>
        </JssProvider>
      </Web3ReactProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
