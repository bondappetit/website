import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Layouts from 'src/layouts';
import InvestForm from 'src/invest-form';
import useLandingStyles from './landing.styles';

export type LandingProps = {};

const tiers = [
	{
		title: 'ETC',
		price: '30',
		buttonText: 'Get started'
	},
	{
		title: 'BTC',
		price: '7000',
		buttonText: 'Get started'
	},
	{
		title: 'DAI',
		price: '1',
		buttonText: 'Get started'
	},
	{
		title: 'TUSD',
		price: '1',
		buttonText: 'Get started'
	}
];

const Landing: React.FC<LandingProps> = () => {
	const classes = useLandingStyles();

	return (
		<Layouts.Main>
			<div className={classes.wrap}>
				<Typography component="h2" variant="h3" color="textPrimary">
					Assets
				</Typography>
				<Grid
					container
					className={classes.grid}
					spacing={5}
					alignItems="flex-end"
				>
					{tiers.map((tier) => (
						<Grid
							item
							key={tier.title}
							xs={12}
							sm={tier.title === 'Enterprise' ? 12 : 6}
							md={3}
						>
							<Card>
								<CardHeader
									title={tier.title}
									titleTypographyProps={{ align: 'center' }}
									subheaderTypographyProps={{ align: 'center' }}
									className={classes.cardHeader}
								/>
								<CardContent>
									<div className={classes.cardPricing}>
										<Typography component="h2" variant="h3" color="textPrimary">
											${tier.price}
										</Typography>
									</div>
								</CardContent>
								<CardActions>
									<Button fullWidth color="primary" variant="outlined">
										{tier.buttonText}
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
				<InvestForm />
			</div>
		</Layouts.Main>
	);
};

export default Landing;
