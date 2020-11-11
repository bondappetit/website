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

  const hasNotMetamask = (name: string) => {
    return !window.ethereum && name === 'MetaMask';
  };

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
                component={hasNotMetamask(name) ? 'a' : undefined}
                href={hasNotMetamask(name) ? 'https://metamask.io/' : undefined}
                target={hasNotMetamask(name) ? '_blank' : undefined}
              >
                <Typography variant="h4" component="span">
                  {hasNotMetamask(name) ? 'Install Metamask' : name}
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
