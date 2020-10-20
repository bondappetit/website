import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';

import common from './common';
import useInvestFormStyles from './invest-form.styles';

export type InvestFormProps = {};

const InvestForm: React.FC<InvestFormProps> = () => {
	const classes = useInvestFormStyles();

	const formik = useFormik({
		initialValues: {
			asset: '',
			invest: '',
			get: ''
		},

		onSubmit: () => {}
	});

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
				{common.constants.ASSETS.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
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
				value={formik.values.get}
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
