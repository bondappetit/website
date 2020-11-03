import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useLayoutWrapperStyles } from './layout-wrapper.styles';

export type LayoutWrapperProps = {
	title?: string;
};

export const LayoutWrapper: React.FC<LayoutWrapperProps> = (props) => {
	const classes = useLayoutWrapperStyles();

	return (
		<>
			<Helmet title={props.title} />
			<div className={classes.root}>{props.children}</div>
		</>
	);
};
