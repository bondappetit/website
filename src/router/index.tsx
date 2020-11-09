import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from 'src/home';
import { URLS } from './urls';

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path={URLS.home}>
					<Home />
				</Route>
				<Route>
					<>not found</>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
