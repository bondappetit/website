import React, { useMemo } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import {
  ButtonBase,
  Typography,
  Plate,
  cutAccount,
  Link,
  useNetworkConfig
} from 'src/common';
import { connectorsByName } from '../connectors';
import { useWalletInfoStyles } from './wallet-info.styles';

export type WalletInfoProps = {
  account?: string | null;
  onChange: () => void;
};

export const WalletInfo: React.FC<WalletInfoProps> = (props) => {
  const classes = useWalletInfoStyles();
  const networkConfig = useNetworkConfig();
  const { connector } = useWeb3React<Web3>();

  const [currentWallet] = useMemo(() => {
    if (!connector) return [];

    return Object.entries(connectorsByName).find(
      ([, connectorByName]) => connectorByName.connector === connector
    );
  }, [connector]);

  return (
    <Plate className={classes.wrap}>
      <div className={classes.header}>
        {props.account && (
          <Jazzicon diameter={32} seed={jsNumberForAddress(props.account)} />
        )}
        <ButtonBase className={classes.button} onClick={props.onChange}>
          Change
        </ButtonBase>
      </div>
      <div>
        <Typography variant="h1" weight="light" align="center">
          {cutAccount(props.account)}
        </Typography>
        <Typography
          variant="body1"
          weight="light"
          align="center"
          className={classes.subtitle}
        >
          Conected with {currentWallet}
        </Typography>
      </div>
      <Typography
        variant="body1"
        weight="light"
        align="center"
        className={classes.link}
      >
        <Link
          target="_blank"
          href={`${networkConfig?.networkEtherscan}/address/${props.account}`}
        >
          View on Etherscan ↗
        </Link>
      </Typography>
    </Plate>
  );
};
