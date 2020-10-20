import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';

ReactDOM.render(
	<React.StrictMode>
		<HelmetProvider>
			<CssBaseline />
			<App />
		</HelmetProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
