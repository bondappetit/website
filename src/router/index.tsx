import React, { Suspense, lazy } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { URLS } from './urls';

const Home = lazy(() => import('src/home'));

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<>loading...</>}>
				<Switch>
					<Route path={URLS.home}>
						<Home />
					</Route>
					<Route>
						<>not found</>
					</Route>
				</Switch>
			</Suspense>
		</BrowserRouter>
	);
};

export default Router;
