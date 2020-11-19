import React, { useCallback, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useUpdateEffect } from 'react-use';

import { Modal } from 'src/common';
import { WalletInfo, WalletList } from '../common';

export type WalletModalProps = {
  open: boolean;
  onClose: () => void;
};

export const WalletModal: React.FC<WalletModalProps> = (props) => {
  const { activate, account } = useWeb3React<Web3>();
  const [currentComponentIndex, setCurrentComponentIndex] = useState(
    account ? 1 : 0
  );

  const { onClose, open } = props;

  const handleActivateWallet = useCallback(
    async (wallet: AbstractConnector) => {
      await activate(wallet);

      if (account) {
        onClose();
        setCurrentComponentIndex(1);
      }
    },
    [onClose, account, activate]
  );

  const handleChangeWallet = useCallback(() => {
    setCurrentComponentIndex(0);
  }, []);

  useUpdateEffect(() => {
    if (account) {
      onClose();

      setCurrentComponentIndex(1);
    }
  }, [account]);

  const components = [
    <WalletList onClick={handleActivateWallet} />,
    <WalletInfo account={account} onChange={handleChangeWallet} />
  ];

  return (
    <Modal open={open} onClose={onClose}>
      {components[currentComponentIndex]}
    </Modal>
  );
};
