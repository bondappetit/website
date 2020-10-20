import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';

import common from './common';
import useInvestFormStyles from './invest-form.styles';

export type InvestFormProps = {};

const InvestForm: React.FC<InvestFormProps> = () => {
	const [get, setGet] = useState(0);

	const classes = useInvestFormStyles();

	const formik = useFormik({
		initialValues: {
			asset: '',
			invest: ''
		},

		onSubmit: () => {}
	});

	const handleSetGet = useCallback(() => {
		if (!common.constants.ASSETS[formik.values.asset]) return;

		setGet(
			Number(formik.values.invest) *
				common.constants.ASSETS[formik.values.asset]
		);
	}, [formik.values.invest, formik.values.asset]);

	useEffect(() => {
		handleSetGet();
	}, [handleSetGet]);

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
				{Object.keys(common.constants.ASSETS).map((asset) => (
					<MenuItem key={asset} value={asset}>
						{asset}
					</MenuItem>
				))}
			</TextField>
			<TextField
				id="invest"
				label="Invest"
				type="text"
				className={classes.input}
				value={formik.values.invest}
				variant="outlined"
				onChange={formik.handleChange}
			/>
			<TextField
				id="get"
				label="You get"
				type="text"
				className={classes.input}
				value={get}
				variant="outlined"
				inputProps={{ readOnly: true }}
			/>
			<Button variant="contained" color="primary">
				Submit
			</Button>
		</form>
	);
};

export default InvestForm;
