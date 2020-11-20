import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { jss, JssProvider } from 'react-jss';
import normalize from 'normalize-jss';
import 'typeface-epilogue';
import { ToastProvider } from 'react-toast-notifications';

import { ThemeProvider, globalStyles } from './common';
import { App } from './app';
import { Web3ReactProviderWithLibrary } from './web3';

jss.createStyleSheet(normalize).attach();
jss.createStyleSheet(globalStyles).attach();

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Web3ReactProviderWithLibrary>
        <JssProvider jss={jss}>
          <ThemeProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </ThemeProvider>
        </JssProvider>
      </Web3ReactProviderWithLibrary>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
