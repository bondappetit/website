import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

import { useScrollStyles } from './scroll-into-view.styles';

export type ScrollIntoViewProps = {
	target: string;
	className?: string;
};

export const ScrollIntoView: React.FC<ScrollIntoViewProps> = (props) => {
	const classes = useScrollStyles();
	const targetElement = useRef<Element | null>(null);

	useEffect(() => {
		targetElement.current = document.querySelector(props.target);
	}, [props.target]);

	const handleScrollIntoView = () => {
		targetElement.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	};

	return (
		<div
			onClick={handleScrollIntoView}
			role="button"
			tabIndex={0}
			className={clsx(props.className, classes.scrollIntoView)}
			onKeyPress={handleScrollIntoView}
		>
			{props.children}
		</div>
	);
};
