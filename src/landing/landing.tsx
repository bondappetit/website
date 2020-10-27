import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BN from 'bignumber.js';
import Dialog from '@material-ui/core/Dialog';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import networks from '@artur-mamedbekov/networkds-test';

import Layouts from 'src/layouts';
import { useEagerConnect } from 'src/web3/hooks';
import { WalletList } from 'src/wallets';
import { InvestForm } from './invest-form';
import { useLandingStyles } from './landing.styles';
import { Token, useInvestmentContract } from './common';

export const Landing: React.FC = () => {
	const [tokens, setTokens] = useState<Token[]>([]);
	const [open, setOpen] = React.useState(false);
	const { account } = useWeb3React<Web3>();

	const classes = useLandingStyles();

	useEagerConnect();

	const investmentContract = useInvestmentContract();

	const handleLoadTokenPrices = useCallback(async () => {
		const tokensWithPrice = Object.entries(networks.development.assets)
			.filter(([, asset]) => asset !== networks.development.assets.Bond)
			.map(async ([name, asset]) => {
				const price = await investmentContract?.methods
					.price(asset.address, new BN(10).pow(asset.decimals).toString())
					.call();

				return {
					name,
					address: asset.address,
					decimals: asset.decimals,
					price: price
						? new BN(price)
								.div(new BN(10).pow(networks.development.assets.Bond.decimals))
								.toString()
						: ''
				};
			});

		setTokens(await Promise.all(tokensWithPrice));
	}, [investmentContract]);

	const handleToggleModal = () => setOpen(!open);

	useEffect(() => {
		handleLoadTokenPrices();
	}, [handleLoadTokenPrices]);

	useEffect(() => {
		if (account) {
			setOpen(false);
		}
	}, [account]);

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
					{tokens.map((token) => (
						<Grid item key={token.name} xs={12} md={4}>
							<Card>
								<CardHeader
									title={token.name}
									titleTypographyProps={{ align: 'center' }}
									subheaderTypographyProps={{ align: 'center' }}
									className={classes.cardHeader}
								/>
								<CardContent>
									<div className={classes.cardPricing}>
										<Typography component="h2" variant="h4" color="textPrimary">
											Bond {token.price}
										</Typography>
									</div>
								</CardContent>
								<CardActions>
									<Button fullWidth color="primary" variant="outlined">
										Get started
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
				<InvestForm
					tokens={tokens}
					onSubmit={handleToggleModal}
					account={account}
				/>
			</div>
			<Dialog
				onClose={handleToggleModal}
				aria-labelledby="simple-dialog-title"
				open={open}
			>
				<WalletList />
			</Dialog>
		</Layouts.Main>
	);
};
