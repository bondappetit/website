import React from 'react';

import { useEagerConnect, useInactiveListener } from './web3/hooks';
import Router from './router';

export const App: React.FC = () => {
	useEagerConnect();
	useInactiveListener();

	return <Router />;
};
