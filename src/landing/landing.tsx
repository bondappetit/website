import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BN from 'bn.js';
import Dialog from '@material-ui/core/Dialog';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import Layouts from 'src/layouts';
import { useEagerConnect } from 'src/web3/hooks';
import { TOKEN_ADDRESSES } from 'src/common';
import { WalletList } from 'src/wallets';
import { InvestForm } from './common/invest-form';
import { useLandingStyles } from './landing.styles';
import { Token, useInvestmentContract } from './common';

export type LandingProps = {};

export const Landing: React.FC<LandingProps> = () => {
	const [tokens, setTokens] = useState<Token[]>([]);
	const [open, setOpen] = React.useState(false);
	const { account } = useWeb3React<Web3>();

	const classes = useLandingStyles();

	useEagerConnect();

	const investmentContract = useInvestmentContract();

	const handleLoadTokenPrices = useCallback(async () => {
		const tokensWithPrice = Object.entries(TOKEN_ADDRESSES).map(
			async ([tokenName, tokenAddress]) => {
				const tokenPrice = await investmentContract?.methods
					.price(tokenAddress)
					.call();

				return {
					tokenName,
					tokenAddress,
					tokenPrice: tokenPrice
						? new BN(tokenPrice).div(new BN((10 ** 18).toString()))
						: ''
				};
			}
		);

		setTokens(await Promise.all(tokensWithPrice));
	}, [investmentContract]);

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
						<Grid item key={token.tokenName} xs={12} md={6}>
							<Card>
								<CardHeader
									title={token.tokenName}
									titleTypographyProps={{ align: 'center' }}
									subheaderTypographyProps={{ align: 'center' }}
									className={classes.cardHeader}
								/>
								<CardContent>
									<div className={classes.cardPricing}>
										<Typography component="h2" variant="h3" color="textPrimary">
											${token.tokenPrice.toString()}
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
				<InvestForm tokens={tokens} onSubmit={() => setOpen(true)} />
			</div>
			<Dialog
				onClose={() => setOpen(false)}
				aria-labelledby="simple-dialog-title"
				open={open}
			>
				<WalletList />
			</Dialog>
		</Layouts.Main>
	);
};
