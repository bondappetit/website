import { useWeb3React } from '@web3-react/core';
import React, { useEffect } from 'react';

import { PageWrapper } from 'src/common';
import { MainLayout } from 'src/layouts';
import { BinanceChain } from './binance-chain';
import { EthChain } from './eth-chain';
import { setupNetwork } from './setup-binance';

export type BinanceProps = unknown;

export const Binance: React.VFC<BinanceProps> = () => {
  const { chainId } = useWeb3React();

  useEffect(() => {
    setupNetwork();
  }, []);

  return (
    <MainLayout>
      <PageWrapper>
        {chainId === 56 && <BinanceChain />}
        {(chainId === 1 || chainId === 3) && <EthChain />}
      </PageWrapper>
    </MainLayout>
  );
};
