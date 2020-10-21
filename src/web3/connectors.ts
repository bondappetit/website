import type { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';

// TODO: move to config
const POLLING_INTERVAL = 12000;
const RPC_URL = '127.0.0.1:8545';
const CHAIN_ID = 1337;

export const injected = new InjectedConnector({
	supportedChainIds: [CHAIN_ID]
});

export const ledger = new LedgerConnector({
	chainId: CHAIN_ID,
	url: RPC_URL,
	pollingInterval: POLLING_INTERVAL
});

enum ConnectorNames {
	Injected = 'Injected',
	Ledger = 'Ledger'
}

export const connectorsByName: Record<ConnectorNames, AbstractConnector> = {
	[ConnectorNames.Injected]: injected,
	[ConnectorNames.Ledger]: ledger
};
