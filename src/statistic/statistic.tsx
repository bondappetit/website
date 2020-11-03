import clsx from 'clsx';
import React from 'react';

import { Typography } from 'src/common';
import { StatisticCard } from './common';
import { useStatisticStyles } from './statistic.styles';

export type StatisticProps = {
	className?: string;
	id?: string;
};

export const Statistic: React.FC<StatisticProps> = (props) => {
	const classes = useStatisticStyles();

	return (
		<div className={clsx(classes.statistic, props.className)} id={props.id}>
			<Typography
				variant="h2"
				weight="light"
				align="center"
				className={classes.title}
			>
				Right now, BondAppétit is conducting the pre-sale round of <br />{' '}
				Appetit Reward Token (ART) — the main tool for decision-making in <br />{' '}
				BondAppétit protocol, as well as the main reward and incentive tool{' '}
				<br /> for participants of the protocol and the community.
			</Typography>
			<div className={classes.row}>
				<StatisticCard>
					<Typography
						variant="h1"
						component="h2"
						weight="light"
						align="center"
						className={classes.count}
					>
						1,200,000
					</Typography>
					<Typography variant="h5" align="center">
						<Typography variant="inherit" weight="bold" align="center">
							Offered during the pre-sale round
						</Typography>{' '}
						12% of the overall issue (10 000 000) is offered to early
						<br /> investors, subject to a 1-year moratorium on sale
					</Typography>
				</StatisticCard>
				<StatisticCard>
					<Typography variant="h4" align="center" className={classes.rightCard}>
						The funds will be used to make first loans to borrowers who will
						bring the first bonds in the form of collateral to the protocol,
						giving an initial kick-off to the protocol’s economics.
					</Typography>
				</StatisticCard>
			</div>
		</div>
	);
};
