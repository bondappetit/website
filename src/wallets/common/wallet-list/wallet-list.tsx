import { AbstractConnector } from '@web3-react/abstract-connector';
import React from 'react';

import { ButtonBase, Typography, Plate } from 'src/common';
import { connectorsByName } from '../connectors';
import { useWalletListStyles } from './wallet-list.styles';

export type WalletListProps = {
	onClick: (connector: AbstractConnector) => void;
};

export const WalletList: React.FC<WalletListProps> = (props) => {
	const classes = useWalletListStyles();

	return (
		<Plate className={classes.wrap}>
			<Typography variant="h3" weight="bold" className={classes.title}>
				Connect your wallet
			</Typography>
			<div className={classes.list}>
				{Object.entries(connectorsByName).map(
					([name, { connector, logo: Logo }]) => {
						return (
							<ButtonBase
								key={name}
								onClick={() => props.onClick(connector)}
								className={classes.wallet}
							>
								<Typography variant="h4" component="span">
									{name}
								</Typography>
								<Logo />
							</ButtonBase>
						);
					}
				)}
			</div>
		</Plate>
	);
};
