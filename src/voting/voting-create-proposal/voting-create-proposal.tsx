import { useFormik } from 'formik';
import React from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { Input, Button, useNetworkConfig } from 'src/common';
import { useGovernorContract } from '../common';
import { useVotingCreateProposalStyles } from './voting-create-proposal.styles';

export type VotingCreateProposalProps = {};

// const proposeTx = await gov.methods
//       .propose(
//         [Investment.address],
//         [0],
//         ["changeBondPrice(uint256)"],
//         [web3.eth.abi.encodeParameters(["uint256"], ["2000000"])],
//         "update bond price for investors"
//       )
//       .send({from: acc, gas: 2000000});

export const VotingCreateProposal: React.FC<VotingCreateProposalProps> = () => {
	const governorContract = useGovernorContract();
	const classes = useVotingCreateProposalStyles();
	const { library } = useWeb3React<Web3>();
	const networkConfig = useNetworkConfig();

	const formik = useFormik({
		initialValues: {
			address: '',
			action: '',
			description: ''
		},

		onSubmit: async (formValues) => {
			if (!library || !governorContract || !networkConfig) return;

			await governorContract?.methods
				.propose(
					[formValues.address],
					[0],
					[formValues.action],
					[library.eth.abi.encodeParameters(['uint256'], ['2000000'])],
					formValues.description
				)
				.send({ from: networkConfig.accounts.Governor.address, gas: 2000000 });
		}
	});

	return (
		<form className={classes.form} onSubmit={formik.handleSubmit}>
			<Input
				name="description"
				label="Description"
				value={formik.values.description}
				onChange={formik.handleChange}
			/>
			<Input
				name="address"
				label="Address"
				value={formik.values.address}
				onChange={formik.handleChange}
			/>
			<Input
				name="action"
				label="Action"
				value={formik.values.action}
				onChange={formik.handleChange}
			/>
			<Button type="submit">Propose</Button>
		</form>
	);
};
