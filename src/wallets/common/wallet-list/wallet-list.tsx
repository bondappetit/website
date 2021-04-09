import { AbstractConnector } from '@web3-react/abstract-connector';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { ButtonBase, Typography } from 'src/common';
import { URLS } from 'src/router/urls';
import { connectorsByName } from '../connectors';
import { useWalletListStyles } from './wallet-list.styles';

export type WalletListProps = {
  onClick: (connector: AbstractConnector) => void;
  errorMessage?: string;
};

export const WalletList: React.FC<WalletListProps> = (props) => {
  const classes = useWalletListStyles();

  const location = useLocation();

  const hasNotMetamask = (name: string) => {
    return !window.ethereum && name === 'MetaMask';
  };

  return (
    <div className={classes.wrap}>
      {Object.entries(connectorsByName).map(
        ([name, { connector, logo: Logo }]) => {
          if (location.pathname !== URLS.playground) {
            return null;
          }

          return (
            <ButtonBase
              key={name}
              onClick={() => props.onClick(connector)}
              className={classes.wallet}
              component={hasNotMetamask(name) ? 'a' : undefined}
              href={hasNotMetamask(name) ? 'https://metamask.io/' : undefined}
              target={hasNotMetamask(name) ? '_blank' : undefined}
            >
              <Typography
                variant="h4"
                component="span"
                className={classes.walletTitle}
              >
                {hasNotMetamask(name) ? 'Install Metamask' : name}
              </Typography>
              <div className={classes.walletLogo}>
                <Logo />
              </div>
            </ButtonBase>
          );
        }
      )}
      {props.errorMessage && (
        <Typography
          variant="body1"
          align="center"
          className={classes.errorMessage}
        >
          {props.errorMessage}
        </Typography>
      )}
    </div>
  );
};
