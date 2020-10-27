import type { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';

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

export const connectorsByName: Record<ConnectorNames, AbstractConnector> = {
	[ConnectorNames.Injected]: injected,
	[ConnectorNames.Ledger]: ledger
};
