import React, { useCallback, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

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
        networkConfig?.networkName &&
        networkConfig?.networkName !== 'mainnet' && (
          <Chip className={classes.chip}>{networkConfig.networkName}</Chip>
        )}
      <ButtonBase onClick={() => setOpen(true)} className={classes.button}>
        {!account && (
          <>
            <Typography variant="body2" className={classes.label}>
              Connect your wallet
            </Typography>
            <WalletIcon />
          </>
        )}

        {account && (
          <>
            <Typography variant="body2" className={classes.account}>
              {cutAccount(account)}
            </Typography>
            <Jazzicon diameter={28} seed={jsNumberForAddress(account)} />
          </>
        )}
      </ButtonBase>
      <WalletModal open={open} onClose={handleClose} />
    </div>
  );
};
