import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import { provider as Web3Provider } from 'web3-core';
import { SnackbarProvider } from 'notistack';

import { App } from './app';

const getLibrary = (provider: Web3Provider): Web3 => {
	const library = new Web3(provider);

	return library;
};

ReactDOM.render(
	<React.StrictMode>
		<HelmetProvider>
			<SnackbarProvider maxSnack={3}>
				<Web3ReactProvider getLibrary={getLibrary}>
					<CssBaseline />
					<App />
				</Web3ReactProvider>
			</SnackbarProvider>
		</HelmetProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
