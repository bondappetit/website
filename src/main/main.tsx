import React from 'react';
import clsx from 'clsx';
import { useToggle } from 'react-use';

import { Head, humanizeNumeral, PageWrapper, Typography } from 'src/common';
import { ReactComponent as MixBytesLogo } from 'src/assets/icons/mix-bytes.svg';
import { MainLayout } from 'src/layouts';
import {
  useStableCoinBalance,
  StablecoinModals,
  useStablecoinModals
} from 'src/stablecoin';
import { useStakingListData } from 'src/staking';
import { ContactsBecomePartner } from 'src/contacts/contacts-become-partner';
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

  const { totalValueLocked, stakingList, count } = useStakingListData(
    undefined,
    4
  );

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

  return (
    <>
      <Head
        title="The first DeFi protocol that connects real-world debt instruments with the Ethereum ecosystem."
        ogUrl="https://bondappetit.io"
      />
      <MainLayout>
        <PageWrapper className={classes.root}>
          <MainStaking
            countOfCards={count}
            className={classes.staking}
            staking={stakingList}
            totalValueLocked={humanizeNumeral(totalValueLocked)}
          />
          <MainStablecoin
            className={classes.stable}
            stablecoinBalance={
              stablecoinBalance.value
                ? humanizeNumeral(stablecoinBalance.value)
                : ''
            }
            onBuy={togglelinkModal}
            onSell={toggleSellModal}
          />
          <MainCollateral className={classes.section} />
          <MainAudit
            className={clsx(classes.section, classes.audit)}
            auditLink="https://github.com/mixbytes/audits_public/tree/a8edc9bf822cdc53c403fa18bd947e25bf5b2e0e/BondAppetit"
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
