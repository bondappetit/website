import React from 'react';
import { useFormik } from 'formik';

import { Input, Button } from 'src/common';

export type VotingDelegateProps = {
	onDelegate: (address: string) => void;
};

export const VotingDelegate: React.FC<VotingDelegateProps> = (props) => {
	const formik = useFormik({
		initialValues: {
			address: ''
		},

		onSubmit: ({ address }) => props.onDelegate(address)
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Input
				name="address"
				label="address"
				value={formik.values.address}
				onChange={formik.handleChange}
			/>
			<Button type="submit">Delegate</Button>
		</form>
	);
};
