import React, { useCallback, useState } from 'react';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useUpdateEffect } from 'react-use';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { Modal, SmallModal } from 'src/common';
import { WalletInfo, WalletList, getWalletErrorMessage } from '../common';

export type WalletModalProps = {
  open: boolean;
  onClose: () => void;
};

export const WalletModal: React.FC<WalletModalProps> = (props) => {
  const { activate, account, error, connector, setError } = useWeb3React<
    Web3
  >();
  const [currentComponentIndex, setCurrentComponentIndex] = useState(
    account ? 1 : 0
  );

  const { onClose, open } = props;

  const handleActivateWallet = useCallback(
    async (wallet: AbstractConnector) => {
      try {
        await activate(wallet, undefined, true);

        if (connector && !error) {
          onClose();
          setCurrentComponentIndex(1);
        }
      } catch (e) {
        setError(e);
        console.error(e.message);
      }
    },
    [onClose, connector, activate, error, setError]
  );

  const handleChangeWallet = useCallback(() => {
    setCurrentComponentIndex(0);
  }, []);

  useUpdateEffect(() => {
    if (account) {
      setCurrentComponentIndex(1);
    }
  }, [account]);

  useUpdateEffect(() => {
    if (error) return;

    if (connector && open) {
      onClose();
    }
  }, [connector, error]);

  const components = [
    <WalletList
      onClick={handleActivateWallet}
      errorMessage={error ? getWalletErrorMessage(error) : undefined}
    />,
    <WalletInfo
      account={account}
      onChange={handleChangeWallet}
      errorMessage={error ? getWalletErrorMessage(error) : undefined}
    />
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <SmallModal>{components[currentComponentIndex]}</SmallModal>
    </Modal>
  );
};
