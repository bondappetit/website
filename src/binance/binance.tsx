import { useWeb3React } from '@web3-react/core';
import React from 'react';

import { Button, PageWrapper } from 'src/common';
import { MainLayout } from 'src/layouts';

export type BinanceProps = unknown;

export const Binance: React.VFC<BinanceProps> = () => {
  const { account, chainId } = useWeb3React();

  return (
    <MainLayout>
      <PageWrapper>
        {chainId === 56 && <div>{String(account)}</div>}
        <Button>Approve</Button>
        <Button>Approve</Button>
      </PageWrapper>
    </MainLayout>
  );
};
