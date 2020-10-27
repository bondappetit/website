import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import BN from 'bignumber.js';
import { useSnackbar } from 'notistack';
import networks from '@artur-mamedbekov/networkds-test';

import type { Ierc20 } from 'src/generate/IERC20';
import { Token } from '../common/landing.types';
import { useInvestFormStyles } from './invest-form.styles';
import {
	useDAIContract,
	useUSDCContract,
	useUSDTContract,
	useInvestmentContract,
	useBondContract
} from '../common';

export type InvestFormValues = {
	asset: string;
	invest: string;
};

export type InvestFormProps = {
	tokens: Token[];
	onSubmit: () => void;
	account?: string | null;
};

export const InvestForm: React.FC<InvestFormProps> = (props) => {
	const tokenContracts: Record<string, Ierc20 | null> = {
		USDT: useUSDTContract(),
		DAI: useDAIContract(),
		USDC: useUSDCContract()
	};

	const bondContract = useBondContract();

	const investmentContract = useInvestmentContract();

	const [youGet, setYouGet] = useState<BN>(new BN(0));

	const classes = useInvestFormStyles();

	const { enqueueSnackbar } = useSnackbar();

	const formik = useFormik<InvestFormValues>({
		initialValues: {
			asset: '',
			invest: ''
		},

		validate: async (formValues) => {
			const error: Partial<InvestFormValues> = {};

			const currentToken = props.tokens[Number(formValues.asset)];
			const currentTokenContract = tokenContracts[currentToken.name];

			if (!currentTokenContract || !props.account) return;

			const balanceOfToken = await currentTokenContract.methods
				.balanceOf(props.account)
				.call();

			if (
				new BN(balanceOfToken)
					.div(new BN(10).pow(currentToken.decimals))
					.isLessThan(formValues.invest)
			) {
				error.invest = 'there are not enough tokens on the balance';
			}

			if (!formValues.asset) {
				error.asset = 'required';
			}

			if (!formValues.invest) {
				error.invest = 'required';
			}

			return error;
		},

		onSubmit: async (formValues) => {
			if (!props.account) {
				props.onSubmit();

				return;
			}

			const currentToken = props.tokens[Number(formValues.asset)];
			const currentTokenContract = tokenContracts[currentToken.name];

			if (!investmentContract?.options.address) return;

			try {
				const bondBalance = await bondContract?.methods
					.balanceOf(investmentContract.options.address)
					.call();

				if (!bondBalance) return;

				const formInvest = new BN(formValues.invest)
					.multipliedBy(new BN(10).pow(currentToken.decimals))
					.toString();

				const bondBalanceNumber = new BN(bondBalance).div(
					new BN(10).pow(networks.development.assets.Bond.decimals)
				);

				if (bondBalanceNumber.isLessThan(youGet)) return;

				if (currentToken.name === 'WETH') {
					await investmentContract.methods
						.investETH()
						.send({ from: props.account, value: formInvest, gas: 2000000 });
				} else {
					if (!currentTokenContract) return;

					const approve = currentTokenContract.methods.approve(
						investmentContract.options.address,
						formInvest
					);

					const allowance = await currentTokenContract.methods
						.allowance(props.account, investmentContract.options.address)
						.call();

					if (allowance !== '0') {
						await currentTokenContract.methods
							.approve(investmentContract.options.address, '0')
							.send({ from: props.account, gas: 2000000 });
					}

					await approve.send({ from: props.account, gas: 2000000 });

					const invest = investmentContract.methods.invest(
						currentTokenContract.options.address,
						formInvest
					);

					await invest.send({ from: props.account, gas: 2000000 });
				}

				enqueueSnackbar('The transaction was successful', {
					variant: 'success'
				});
				formik.resetForm();
				setYouGet(new BN(0));
			} catch (error) {
				enqueueSnackbar(error.message, { variant: 'error' });
			}
		}
	});

	const handleSetYouGet = useCallback(() => {
		if (
			!formik.values.asset ||
			!props.tokens[Number(formik.values.asset)]?.price
		)
			return;

		setYouGet(
			new BN(formik.values.invest).multipliedBy(
				props.tokens[Number(formik.values.asset)].price
			)
		);
	}, [formik.values.invest, formik.values.asset, props.tokens]);

	useEffect(() => {
		handleSetYouGet();
	}, [handleSetYouGet]);

	return (
		<form className={classes.form} onSubmit={formik.handleSubmit}>
			<TextField
				id="asset"
				select
				label="Asset"
				name="asset"
				className={classes.input}
				error={Boolean(formik.errors.asset)}
				helperText={formik.errors.asset}
				value={formik.values.asset}
				onChange={formik.handleChange}
				variant="outlined"
				disabled={formik.isSubmitting}
			>
				{props.tokens.map((token, index) => (
					<MenuItem key={token.name} value={index.toString()}>
						{token.name}
					</MenuItem>
				))}
			</TextField>
			<TextField
				id="invest"
				label="Invest"
				type="number"
				className={classes.input}
				value={formik.values.invest}
				variant="outlined"
				error={Boolean(formik.errors.invest)}
				helperText={formik.errors.invest}
				onChange={formik.handleChange}
				disabled={formik.isSubmitting}
			/>
			<TextField
				id="youGet"
				label="You get"
				type="text"
				className={classes.input}
				value={youGet.isNaN() ? '0' : youGet.toString()}
				variant="outlined"
				inputProps={{ readOnly: true }}
				disabled={formik.isSubmitting}
			/>
			<Button
				type="submit"
				variant="contained"
				color="primary"
				disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
			>
				{props.account ? 'Submit' : 'Connect wallet'}
			</Button>
		</form>
	);
};
