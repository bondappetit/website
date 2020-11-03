import React from 'react';

import { Button, Typography } from 'src/common';
import { useInvestingInfoStyles } from './investing-info.styles';

export type InvestingInfoProps = {
	title?: React.ReactNode;
	subtitle?: React.ReactNode;
	button?: React.ReactNode;
	onClick?: () => void;
	success?: boolean;
};

export const InvestingInfo: React.FC<InvestingInfoProps> = (props) => {
	const classes = useInvestingInfoStyles();

	return (
		<div className={classes.wrap}>
			<div className={classes.title}>
				<Typography variant="h2" align="center" className={classes.typography}>
					{props.title}
				</Typography>
				<Typography variant="h2" align="center" className={classes.typography}>
					{props.subtitle}
				</Typography>
			</div>
			<Button color="primary" onClick={props.onClick}>
				{props.button}
			</Button>
		</div>
	);
};
