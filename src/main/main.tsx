import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useToggle } from 'react-use';
import { useWeb3React } from '@web3-react/core';

import {
  Head,
  humanizeNumeral,
  PageWrapper,
  Typography,
  useChangeNetworkModal
} from 'src/common';
import { ReactComponent as MixBytesLogo } from 'src/assets/icons/mix-bytes.svg';
import { MainLayout } from 'src/layouts';
import {
  useStableCoinBalance,
  StablecoinModals,
  useStablecoinModals
} from 'src/stablecoin';
import { useStakingListData } from 'src/staking';
import { ContactsBecomePartner } from 'src/contacts/contacts-become-partner';
import { config } from 'src/config';
import {
  MainStaking,
  MainStablecoin,
  MainCollateral,
  MainVoting,
  MainSteps,
  MainEditor,
  MainAudit,
  MainMediumArticles,
  MainWaves
} from './common';
import { useMainStyles } from './main.styles';
import { useMediumArticles } from './common/use-medium-articles';
import { MainCointelegraph } from './common/main-cointelegraph';

export const Main: React.FC = () => {
  const classes = useMainStyles();

  const { chainId } = useWeb3React();

  const { totalValueLocked, stakingList } = useStakingListData();

  const stablecoinBalance = useStableCoinBalance();

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

  const mediumArticles = useMediumArticles();

  const [becomeAPartnerIsOpen, toggleBecomeAPartner] = useToggle(false);

  const [openChangeNetwork, closeChangeNetwork] = useChangeNetworkModal();

  useEffect(() => {
    if (config.CHAIN_IDS.includes(Number(chainId))) {
      closeChangeNetwork();
    }
  }, [chainId, closeChangeNetwork]);

  return (
    <>
      <Head
        title="The first DeFi protocol that connects real-world debt instruments with the Ethereum ecosystem."
        ogUrl="https://bondappetit.io"
      />
      <MainLayout>
        <PageWrapper className={classes.root}>
          <MainStaking
            countOfCards={4}
            className={classes.staking}
            staking={stakingList?.slice(0, 4)}
            totalValueLocked={humanizeNumeral(totalValueLocked)}
          />
          <MainStablecoin
            className={classes.stable}
            stablecoinBalance={
              stablecoinBalance.value
                ? humanizeNumeral(stablecoinBalance.value)
                : ''
            }
            onBuy={
              config.CHAIN_BINANCE_IDS.includes(Number(chainId))
                ? openChangeNetwork
                : togglelinkModal
            }
            onSell={toggleSellModal}
          />
          <MainCollateral className={classes.section} />
          <MainAudit
            className={clsx(classes.section, classes.audit)}
            auditLink="https://github.com/mixbytes/audits_public/tree/4fc7d333e3df57586e0f96cc551819e2c93f3ae9/BondAppetit"
            companyLogo={<MixBytesLogo />}
          />
          <MainSteps className={classes.steps} />
          <MainEditor className={classes.editor} />
          <MainVoting className={classes.voting} />
          <MainWaves
            className={classes.editor}
            onBecomePartner={toggleBecomeAPartner}
          />
          <div>
            <Typography
              variant="h4"
              align="center"
              className={classes.newsTitle}
            >
              Learn more about BondAppetit, explore our partnerships, media and
              artilces.
            </Typography>
            <div className={classes.articles}>
              <MainMediumArticles
                loading={mediumArticles.loading}
                articles={mediumArticles.value}
              />
              <MainCointelegraph />
            </div>
          </div>
        </PageWrapper>
      </MainLayout>
      <ContactsBecomePartner
        open={becomeAPartnerIsOpen}
        onClose={toggleBecomeAPartner}
      />
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
