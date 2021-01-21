import React, { useCallback, useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import clsx from 'clsx';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import {
  ButtonBase,
  Typography,
  cutAccount,
  Chip,
  useNetworkConfig
} from 'src/common';
import { ReactComponent as WalletIcon } from 'src/assets/icons/wallet.svg';
import { useWalletButtonStyles } from './wallet-button.styles';
import { WalletModal } from '../wallet-modal';

export const WalletButton: React.FC = () => {
  const classes = useWalletButtonStyles();
  const { account } = useWeb3React<Web3>();
  const [open, setOpen] = useState(false);
  const networkConfig = useNetworkConfig();

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <div className={classes.wrap}>
      {account &&
        networkConfig.networkName &&
        networkConfig.networkName !== 'mainnet' && (
          <Chip className={classes.chip}>{networkConfig.networkName}</Chip>
        )}
      <ButtonBase
        onClick={() => setOpen(true)}
        className={clsx(classes.button, classes.connected)}
      >
        <Typography variant="body2" className={classes.account}>
          {account ? cutAccount(account) : <>Connect your wallet</>}
        </Typography>
        {account ? (
          <Jazzicon diameter={28} seed={jsNumberForAddress(account)} />
        ) : (
          <WalletIcon className={classes.walletIcon} />
        )}
      </ButtonBase>
      <WalletModal open={open} onClose={handleClose} />
    </div>
  );
};
