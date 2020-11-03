import React, { useEffect, useMemo } from 'react';
import { ButtonBase } from '../button-base';

import { useSelectContext } from './select.context';
import { useSelectStyles } from './select.styles';

export type SelectOptionProps = React.HTMLProps<HTMLOptionElement> & {
	value?: string | number;
};

export const SelectOption: React.FC<SelectOptionProps> = (props) => {
	const select = useSelectContext();
	const classes = useSelectStyles();

	const option = useMemo(
		() => ({
			label: props.label,
			value: props.value
		}),
		[props.label, props.value]
	);

	useEffect(() => {
		select?.handleAddOption(option);
	}, [select, option]);

	return (
		<ButtonBase
			type="button"
			onClick={() => select?.handleSetOption(option)}
			className={classes.option}
		>
			{props.label}
		</ButtonBase>
	);
};
