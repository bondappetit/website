import React from 'react';

import { LayoutLogo } from '../layout-logo';
import { useLayoutHeaderStyles } from './layout-header.styles';

export type LayoutHeaderProps = {
	leftButton?: React.ReactNode;
	rightButton?: React.ReactNode;
};

export const LayoutHeader: React.FC<LayoutHeaderProps> = (props) => {
	const classes = useLayoutHeaderStyles();

	return (
		<header className={classes.root}>
			{props.leftButton}
			<LayoutLogo />
			{props.rightButton}
		</header>
	);
};
