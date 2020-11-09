import React from 'react';
import OpenGraph from 'src/assets/images/ba-opengraph.jpg';

import { MainLayout } from 'src/layouts';
import { ButtonBase, Typography } from 'src/common';
import { Statistic } from 'src/statistic';
import { Documents } from 'src/documents';
import { Announcement } from 'src/announcement';
import { ReactComponent as ArrowDownIcon } from 'src/assets/icons/arrow-down.svg';
import { useHomeStyles } from './home.styles';
import { ScrollIntoView } from './common';

export const Home: React.FC = () => {
	const classes = useHomeStyles();

	return (
		<MainLayout
			title="BondAppetit - The first DeFi protocol that connects real-world debt instruments with the Ethereum ecosystem."
			ogImage={`https://bondappetit.io${OpenGraph}`}
			ogUrl="https://bondappetit.io"
		>
			<div className={classes.home}>
				<Typography
					variant="h1"
					weight="light"
					align="center"
					className={classes.title}
				>
					The first DeFi protocol that <br />
					connects&nbsp;real-world debt <br />
					instruments with the Ethereum <br />
					ecosystem.
				</Typography>
				<Announcement className={classes.announcement} />
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
