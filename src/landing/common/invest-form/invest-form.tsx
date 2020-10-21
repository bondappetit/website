import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import { Token } from '../landing.types';
import { useInvestFormStyles } from './invest-form.styles';

export type InvestFormProps = {
	tokens: Token[];
	onSubmit: () => void;
};

export const InvestForm: React.FC<InvestFormProps> = (props) => {
	const [youGet, setYouGet] = useState(0);
	const { account } = useWeb3React<Web3>();

	const classes = useInvestFormStyles();

	const formik = useFormik({
		initialValues: {
			asset: 0,
			invest: ''
		},

		onSubmit: () => {
			if (!account) props.onSubmit();
		}
	});

	const handleSetYouGet = useCallback(() => {
		if (!props.tokens[formik.values.asset]?.tokenPrice) return;

		setYouGet(
			Number(formik.values.invest) *
				Number(props.tokens[formik.values.asset].tokenPrice)
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
				value={formik.values.asset}
				onChange={formik.handleChange}
				variant="outlined"
			>
				{props.tokens.map((token, index) => (
					<MenuItem key={token.tokenName} value={index}>
						{token.tokenName}
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
				onChange={formik.handleChange}
			/>
			<TextField
				id="youGet"
				label="You get"
				type="text"
				className={classes.input}
				value={youGet}
				variant="outlined"
				inputProps={{ readOnly: true }}
			/>
			<Button type="submit" variant="contained" color="primary">
				{account ? 'Submit' : 'Connect wallet'}
			</Button>
		</form>
	);
};
