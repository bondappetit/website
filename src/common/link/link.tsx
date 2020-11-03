import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

export type LinkProps = {
	component?: ReactRouterLink | 'a';
	to?: string;
};

export const Link: React.FC<LinkProps> = (props) => {
	const Component = props.component || ReactRouterLink;

	return <Component to={props.to ?? ''}>{props.children}</Component>;
};
