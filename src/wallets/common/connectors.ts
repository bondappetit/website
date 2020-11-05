import type { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';
import React from 'react';

import { ReactComponent as MetaMaskIcon } from 'src/assets/icons/metamask.svg';
import { ReactComponent as LedgerIcon } from 'src/assets/icons/ledger.svg';
import { config } from 'src/config';

export const injected = new InjectedConnector({
	supportedChainIds: config.CHAIN_IDS
});

export const ledger = new LedgerConnector({
	chainId: config.CHAIN_IDS[0],
	url: config.RPC_URL,
	pollingInterval: config.POLLING_INTERVAL
});

enum ConnectorNames {
	Injected = 'MetaMask',
	Ledger = 'Ledger'
}

export const connectorsByName: Record<
	ConnectorNames,
	{ connector: AbstractConnector; logo: React.FC }
> = {
	[ConnectorNames.Injected]: {
		connector: injected,
		logo: MetaMaskIcon
	},
	[ConnectorNames.Ledger]: {
		connector: ledger,
		logo: LedgerIcon
	}
};
