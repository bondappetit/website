import React from 'react';
import clsx from 'clsx';

import { useButtonBaseStyles } from './button-base.styles';

export type ButtonBaseProps = React.HTMLProps<HTMLButtonElement> & {
	component?: React.ElementType;
	ref?:
		| ((instance: HTMLButtonElement | null) => void)
		| React.MutableRefObject<HTMLButtonElement | null>
		| null;
};

export const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
	(props, ref) => {
		const classes = useButtonBaseStyles();

		const { component, className, children, ...restOfProps } = props;

		const Component = component as React.ElementType;

		const classNames = clsx(classes.baseButton, className, {
			[classes.disabled]: props.disabled
		});

		return (
			<Component ref={ref} className={classNames} {...restOfProps}>
				{children}
			</Component>
		);
	}
);

ButtonBase.defaultProps = {
	component: 'button'
};

ButtonBase.displayName = 'ButtonBase';
