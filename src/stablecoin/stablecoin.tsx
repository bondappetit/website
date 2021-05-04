import React from 'react';
import { useWeb3React } from '@web3-react/core';

import { Head, PageWrapper, useChangeNetworkModal } from 'src/common';
import { MainLayout } from 'src/layouts';
import { config } from 'src/config';
import {
  StablecoinDecentralized,
  StablecoinEllipse,
  StablecoinFaq,
  StablecoinTable,
  useStablecoinInfo
} from './common';
import { useStablecoinStyles } from './stablecoin.styles';
import { StablecoinModals, useStablecoinModals } from './stablecoin-modals';

export const Stablecoin: React.FC = () => {
  const classes = useStablecoinStyles();

  const stablecoinInfo = useStablecoinInfo();

  const { chainId } = useWeb3React();

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

  const [openChangeNetwork] = useChangeNetworkModal();

  return (
    <>
      <Head title="The first-ever decentralized stablecoin based on real-world assets." />
      <MainLayout>
        <PageWrapper>
          <StablecoinEllipse
            className={classes.section}
            onBuy={
              config.CHAIN_BINANCE_IDS.includes(Number(chainId))
                ? openChangeNetwork
                : togglelinkModal
            }
            onSell={toggleSellModal}
            loading={stablecoinInfo.loading}
            tokenInfo={stablecoinInfo.value}
          />
          <StablecoinDecentralized className={classes.section} />
          <StablecoinTable className={classes.section} />
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
