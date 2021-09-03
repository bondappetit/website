import { useWeb3React } from '@web3-react/core';
import React from 'react';

import { Head, PageWrapper, useChangeNetworkModal } from 'src/common';
import { MainLayout } from 'src/layouts';
import { useIssuerBalance } from 'src/collateral';
import { config } from 'src/config';
import {
  StablecoinCollateral,
  StablecoinGraph,
  StablecoinFaq,
  StablecoinHeader,
  StablecoinTable,
  useStableCoinBalance,
  StablecoinBuyingSelling,
  StablecoinFeatures,
  useStablecoinHowItWorks
} from './common';
import { useStablecoinStyles } from './stablecoin.styles';
import { StablecoinModals, useStablecoinModals } from './stablecoin-modals';
import { useStablecoinBuybackModal } from './stablecoin-buyback-modal';

export const Stablecoin: React.FC = () => {
  const classes = useStablecoinStyles();

  const { chainId } = useWeb3React();

  const {
    linkModalOpen,
    togglelinkModal,
    sellModalOpen,
    toggleSellModal,
    handleBuyMarket,
    marketModalOpen,
    toggleMarketModal
  } = useStablecoinModals();

  const stableCoinBalance = useStableCoinBalance();
  const issuerBalance = useIssuerBalance();

  const [openBuybackModal] = useStablecoinBuybackModal();
  const [openChangeNetwork] = useChangeNetworkModal();

  const [openHowItWorks] = useStablecoinHowItWorks();

  const handleOpenBuyBack = () => {
    if (config.CHAIN_BINANCE_IDS.includes(Number(chainId))) {
      openChangeNetwork().catch(console.error);
    } else {
      openHowItWorks({
        onSwap: () => openBuybackModal().catch(console.error)
      }).catch(console.error);
    }
  };

  return (
    <>
      <Head title="The first-ever decentralized stablecoin based on real-world assets." />
      <MainLayout>
        <PageWrapper>
          <StablecoinHeader className={classes.header} />
          <StablecoinGraph
            className={classes.section}
            loading={stableCoinBalance.loading}
            issuerBalance={stableCoinBalance.value}
          >
            <StablecoinBuyingSelling
              onBuy={togglelinkModal}
              onSell={toggleSellModal}
              onSwap={handleOpenBuyBack}
              stableCoinBalanceLoading={stableCoinBalance.loading}
              stableCoinBalanceValue={stableCoinBalance.value}
            />
          </StablecoinGraph>
          <StablecoinFeatures className={classes.section} />
          <StablecoinTable className={classes.section} />
          <StablecoinCollateral
            stableCoinBalanceLoading={stableCoinBalance.loading}
            stableCoinBalanceValue={stableCoinBalance.value}
            issuerBalanceLoading={issuerBalance.loading}
            issuerBalanceValue={issuerBalance.value}
            className={classes.section}
          />
          <StablecoinFaq className={classes.section} />
        </PageWrapper>
      </MainLayout>
      <StablecoinModals
        marketModalOpen={marketModalOpen}
        toggleMarketModal={toggleMarketModal}
        linkModalOpen={linkModalOpen}
        togglelinkModal={togglelinkModal}
        sellModalOpen={sellModalOpen}
        toggleSellModal={toggleSellModal}
        onBuyMarket={handleBuyMarket}
      />
    </>
  );
};
