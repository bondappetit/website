import { useWeb3React } from '@web3-react/core';
import React, { useCallback, useState } from 'react';
import Web3 from 'web3';
import { useToggle } from 'react-use';

import { Button, PageWrapper } from 'src/common';
import { MainLayout } from 'src/layouts';

export type PlaygroundProps = unknown;

export const Playground: React.FC<PlaygroundProps> = () => {
  const { library, account } = useWeb3React<Web3>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, toggleLoading] = useToggle(false);

  const handleSignTransaction = useCallback(async () => {
    if (!account || !library) return;

    toggleLoading(true);

    try {
      await library.eth.sign('test', account, (error) => {
        setErrorMessage(error?.message);
        console.error(error);
      });
    } catch (error) {
      console.error(error);

      setErrorMessage(error.message);
    } finally {
      toggleLoading(false);
    }
  }, [library, account, toggleLoading]);

  return (
    <MainLayout>
      <PageWrapper>
        <Button
          disabled={loading}
          loading={loading}
          onClick={handleSignTransaction}
        >
          Sign transaction
        </Button>
        {errorMessage}
      </PageWrapper>
    </MainLayout>
  );
};
