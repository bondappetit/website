/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-extraneous-dependencies
import { ConnectorUpdate } from '@web3-react/types';
import { AbstractConnector } from '@web3-react/abstract-connector';

const CHAIN_ID = 1;

interface WalletLinkConnectorArguments {
  url: string;
  appName: string;
  appLogoUrl?: string;
  darkMode?: boolean;
}

export class WalletLinkConnector extends AbstractConnector {
  private readonly url: string;

  private readonly appName: string;

  private readonly appLogoUrl?: string;

  private readonly darkMode: boolean;

  public walletLink: any;

  private provider: any;

  constructor({
    url,
    appName,
    appLogoUrl,
    darkMode
  }: WalletLinkConnectorArguments) {
    super({ supportedChainIds: [CHAIN_ID] });

    this.url = url;
    this.appName = appName;
    this.appLogoUrl = appLogoUrl;
    this.darkMode = darkMode || false;
  }

  public async activate(): Promise<ConnectorUpdate> {
    if (!this.walletLink) {
      // eslint-disable-next-line import/no-extraneous-dependencies
      const WalletLink = await import('walletlink').then(
        (m) => m?.default ?? m
      );
      this.walletLink = new WalletLink({
        appName: this.appName,
        darkMode: this.darkMode,
        ...(this.appLogoUrl ? { appLogoUrl: this.appLogoUrl } : {})
      });
      const provider = this.walletLink.makeWeb3Provider(this.url, CHAIN_ID);

      provider.request = provider.request.bind(provider);
      provider.setAppInfo = provider.setAppInfo.bind(provider);
      provider.enable = provider.enable.bind(provider);
      provider.close = provider.close.bind(provider);
      provider.send = provider.send.bind(provider);
      provider.sendAsync = provider.sendAsync.bind(provider);
      provider.request = provider.request.bind(provider);
      provider.scanQRCode = provider.scanQRCode.bind(provider);
      provider.arbitraryRequest = provider.arbitraryRequest.bind(provider);
      provider.childRequestEthereumAccounts =
        provider.childRequestEthereumAccounts.bind(provider);

      provider.on('chainChanged', this.handleChainChanged);
      provider.on('accountsChanged', this.handleAccountsChanged);

      this.provider = provider;
    }

    const account = await this.provider
      .send('eth_requestAccounts')
      .then((accounts: string[]): string => accounts[0]);

    this.provider.on('chainChanged', this.handleChainChanged);
    this.provider.on('accountsChanged', this.handleAccountsChanged);

    return { provider: this.provider, chainId: CHAIN_ID, account };
  }

  public async getProvider(): Promise<any> {
    return this.provider;
  }

  public async getChainId(): Promise<number> {
    return CHAIN_ID;
  }

  public async getAccount(): Promise<null | string> {
    return this.provider
      .send('eth_accounts')
      .then((accounts: string[]): string => accounts[0]);
  }

  public deactivate() {
    this.provider.removeListener('chainChanged', this.handleChainChanged);
    this.provider.removeListener('accountsChanged', this.handleAccountsChanged);
  }

  public async close() {
    this.provider.close();
    this.emitDeactivate();
  }

  private handleChainChanged(chainId: number | string): void {
    this.emitUpdate({ chainId });
  }

  private handleAccountsChanged(accounts: string[]): void {
    this.emitUpdate({ account: accounts[0] });
  }
}
