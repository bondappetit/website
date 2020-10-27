import type { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';

// TODO: move to config
const POLLING_INTERVAL = 12000;
const RPC_URL = '127.0.0.1:8545';
const CHAIN_IDS = [1, 3, 4, 5, 42, 999];

export const injected = new InjectedConnector({
	supportedChainIds: CHAIN_IDS
});

export const ledger = new LedgerConnector({
	chainId: CHAIN_IDS[0],
	url: RPC_URL,
	pollingInterval: POLLING_INTERVAL
});

enum ConnectorNames {
	Injected = 'MetaMask',
	Ledger = 'Ledger'
}

export const connectorsByName: Record<ConnectorNames, AbstractConnector> = {
	[ConnectorNames.Injected]: injected,
	[ConnectorNames.Ledger]: ledger
};
