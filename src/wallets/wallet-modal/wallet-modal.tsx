import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { AbstractConnector } from '@web3-react/abstract-connector';

import { Modal } from 'src/common';
import { WalletInfo, WalletList } from '../common';

export type WalletModalProps = {
	open: boolean;
	onClose: () => void;
};

export const WalletModal: React.FC<WalletModalProps> = (props) => {
	const { activate, account } = useWeb3React<Web3>();
	const [currentComponentIndex, setCurrentComponentIndex] = useState(
		account ? 1 : 0
	);

	const handleActivateWallet = async (connector: AbstractConnector) => {
		await activate(connector);

		if (account) {
			setCurrentComponentIndex(1);
		}
	};

	useEffect(() => {
		if (account) {
			setCurrentComponentIndex(1);
		}
	}, [account]);

	const components = [
		<WalletList onClick={handleActivateWallet} />,
		<WalletInfo
			account={account}
			onChange={() => setCurrentComponentIndex(0)}
		/>
	];

	return (
		<Modal open={props.open} onClose={props.onClose}>
			{components[currentComponentIndex]}
		</Modal>
	);
};
