import React from 'react';

import { useEagerConnect } from './web3/hooks';
import Router from './router';

export const App: React.FC = () => {
	useEagerConnect();

	return <Router />;
};
