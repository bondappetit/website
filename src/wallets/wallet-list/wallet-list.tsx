import { useWeb3React } from '@web3-react/core';
import React from 'react';
import Web3 from 'web3';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { connectorsByName } from 'src/wallets/common';
import { useWalletListStyles } from './wallet-list.styles';

export type WalletListProps = {};

export const WalletList: React.FC<WalletListProps> = () => {
	const { activate } = useWeb3React<Web3>();

	const classes = useWalletListStyles();

	return (
		<List className={classes.wrap}>
			{Object.entries(connectorsByName).map(([name, connector]) => {
				return (
					<ListItem button key={name} onClick={() => activate(connector)}>
						<ListItemText primary={name} />
					</ListItem>
				);
			})}
		</List>
	);
};
