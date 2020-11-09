import React from 'react';

import { useLayoutContainerStyles } from './layout-container.styles';

export type LayoutContainerProps = {};

export const LayoutContainer: React.FC<LayoutContainerProps> = (props) => {
	const classes = useLayoutContainerStyles();

	return <main className={classes.container}>{props.children}</main>;
};
