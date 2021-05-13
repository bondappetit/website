import React from 'react';

import { Head, PageWrapper } from 'src/common';
import { MainLayout } from 'src/layouts';
import {
  StablecoinCollateral,
  StablecoinEllipse,
  StablecoinFaq,
  StablecoinHeader,
  StablecoinTable,
  useStablecoinInfo
} from './common';
import { useStablecoinStyles } from './stablecoin.styles';
import { StablecoinModals, useStablecoinModals } from './stablecoin-modals';
import { StablecoinFeatures } from './common/stablecoin-features/stablecoin-features';

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

  return (
    <>
      <Head title="The first-ever decentralized stablecoin based on real-world assets." />
      <MainLayout>
        <PageWrapper>
          <StablecoinHeader />
          <StablecoinEllipse
            className={classes.section}
            onBuy={togglelinkModal}
            onSell={toggleSellModal}
            loading={stablecoinInfo.loading}
            tokenInfo={stablecoinInfo.value}
          />
          <StablecoinFeatures className={classes.section} />
          <StablecoinTable className={classes.section} />
          <StablecoinCollateral className={classes.section} />
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
