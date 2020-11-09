import React from 'react';

import { MainLayout } from 'src/layouts';
import { ButtonBase, Typography } from 'src/common';
import { Investing } from 'src/investing';
import { Statistic } from 'src/statistic';
import { Documents } from 'src/documents';
import { ReactComponent as ArrowDownIcon } from 'src/assets/icons/arrow-down.svg';
import { useHomeStyles } from './home.styles';
import { ScrollIntoView } from './common';

export type HomeProps = {};

export const Home: React.FC<HomeProps> = () => {
	const classes = useHomeStyles();

	return (
		<MainLayout title="home">
			<div className={classes.home}>
				<Typography
					variant="h1"
					weight="light"
					align="center"
					className={classes.title}
				>
					The first DeFi protocol that
					<br />
					connects&nbsp;real-world debt
					<br />
					instruments with the Ethereum
					<br />
					ecosystem.
				</Typography>
				<Investing className={classes.investing} />
				<div className={classes.button}>
					<ScrollIntoView target="#statistic">
						<ButtonBase>
							<ArrowDownIcon />
						</ButtonBase>
					</ScrollIntoView>
				</div>
				<Statistic id="statistic" className={classes.statistic} />
				<Documents className={classes.documents} />
			</div>
		</MainLayout>
	);
};
