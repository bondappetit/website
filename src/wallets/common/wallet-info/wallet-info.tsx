import React from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { ButtonBase, Typography, Plate, cutAccount, Link } from 'src/common';
import { useWalletInfoStyles } from './wallet-info.styles';

export type WalletInfoProps = {
  account?: string | null;
  onChange: () => void;
};

const WALLET = 'MetaMask';

export const WalletInfo: React.FC<WalletInfoProps> = (props) => {
  const classes = useWalletInfoStyles();

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
          Conected with {WALLET}
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
          href={`https://etherscan.io/address/${props.account}`}
        >
          View on Etherscan ↗
        </Link>
      </Typography>
    </Plate>
  );
};
