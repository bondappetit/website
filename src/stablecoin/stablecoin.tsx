import React from 'react';

import { Head, PageWrapper } from 'src/common';
import { MainLayout } from 'src/layouts';
import { config } from 'src/config';
import { useIssuerBalance } from 'src/collateral';
import {
  StablecoinCollateral,
  StablecoinGraph,
  StablecoinFaq,
  StablecoinHeader,
  StablecoinTable,
  useStableCoinBalance,
  useStablecoinInfo
} from './common';
import { useStablecoinStyles } from './stablecoin.styles';
import { StablecoinModals, useStablecoinModals } from './stablecoin-modals';
import { StablecoinFeatures } from './common/stablecoin-features/stablecoin-features';
import StablecoinBuyingSelling from './common/stablecoin-buying-selling/stablecoin-buying-selling';
import { useStablecoinBuybackModal } from './stablecoin-buyback-modal';

export const Stablecoin: React.FC = () => {
  const classes = useStablecoinStyles();

  const stablecoinInfo = useStablecoinInfo();

  const {
    linkModalOpen,
    togglelinkModal,
    sellModalOpen,
    toggleSellModal,
    handleBuyCollateralMarket,
    handleBuyMarket,
    marketModalOpen,
    toggleMarketModal,
    collateralMarketModalOpen,
    toggleCollateralMarketModal
  } = useStablecoinModals();

  const stableCoinBalance = useStableCoinBalance();
  const issuerBalance = useIssuerBalance();

  const [openBuybackModal] = useStablecoinBuybackModal();

  return (
    <>
      <Head title="The first-ever decentralized stablecoin based on real-world assets." />
      <MainLayout>
        <PageWrapper>
          {config.BUY_BACK_ENABLE && (
            <button onClick={openBuybackModal}>buy back</button>
          )}
          <StablecoinHeader className={classes.header} />
          <StablecoinGraph
            className={classes.section}
            loading={stablecoinInfo.loading}
            tokenInfo={stablecoinInfo.value}
          >
            <StablecoinBuyingSelling
              onBuy={togglelinkModal}
              onSell={toggleSellModal}
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
        onBuyCollateralMarket={handleBuyCollateralMarket}
        onBuyMarket={handleBuyMarket}
        toggleCollateralMarketModal={toggleCollateralMarketModal}
        collateralMarketModalOpen={collateralMarketModalOpen}
      />
    </>
  );
};
