import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import React from 'react';
import { useToggle } from 'react-use';

import {
  BN,
  Head,
  humanizeNumeral,
  LinkModal,
  PageWrapper,
  Typography,
  useChangeNetworkModal,
  useNetworkConfig
} from 'src/common';
import { ReactComponent as MixBytesLogo } from 'src/assets/icons/mix-bytes.svg';
import { ReactComponent as HashExLogo } from 'src/assets/icons/hashex.svg';
import { MainLayout } from 'src/layouts';
import {
  useStableCoinBalance,
  StablecoinModals,
  useStablecoinModals,
  useStablecoinBuybackModal,
  useStablecoinHowItWorks
} from 'src/stablecoin';
import {
  StakingSwopFi,
  useStakingCoupons,
  useStakingListData
} from 'src/staking';
import { ContactsBecomePartner } from 'src/contacts/contacts-become-partner';
import { config } from 'src/config';
import {
  MainStaking,
  MainStablecoin,
  MainSteps,
  MainEditor,
  MainAudit,
  MainMediumArticles,
  MainWaves,
  MainTeam,
  MainHeader,
  MainNewsResources,
  MainEconomy,
  MainStake
} from './common';
import { useMainStyles } from './main.styles';
import { useMediumArticles } from './common/use-medium-articles';
import { MainCointelegraph } from './common/main-cointelegraph';

export const Main: React.FC = () => {
  const classes = useMainStyles();

  const { chainId } = useWeb3React();

  const {
    totalValueLocked,
    stakingList,
    governanceInUSDC,
    swopfiItem,
    swopfiLoading
  } = useStakingListData();

  const stablecoinBalance = useStableCoinBalance();

  const { stakingCoupons } = useStakingCoupons();

  const {
    linkModalOpen,
    togglelinkModal,
    sellModalOpen,
    toggleSellModal,
    handleBuyMarket,
    marketModalOpen,
    toggleMarketModal
  } = useStablecoinModals();

  const mediumArticles = useMediumArticles();

  const [becomeAPartnerIsOpen, toggleBecomeAPartner] = useToggle(false);

  const [linksOpen, linksToggle] = useToggle(false);

  const networkConfig = useNetworkConfig();

  const [openBuyback] = useStablecoinBuybackModal();
  const [openChangeNetwork] = useChangeNetworkModal();
  const [openHowItWorks] = useStablecoinHowItWorks();

  const handleOpenBuyBack = () => {
    if (config.CHAIN_BINANCE_IDS.includes(Number(chainId))) {
      openChangeNetwork().catch(console.error);
    } else {
      openHowItWorks({
        onSwap: () => openBuyback().catch(console.error)
      }).catch(console.error);
    }
  };

  return (
    <>
      <Head
        title="The first decentralized lending protocol with a stablecoin 100% backed by yield-generating bonds"
        ogUrl="https://bondappetit.io"
      />
      <MainLayout>
        <PageWrapper className={classes.root}>
          <MainHeader
            onBuyStable={togglelinkModal}
            totalValueLocked={humanizeNumeral(totalValueLocked)}
            stablecoinBalance={humanizeNumeral(stablecoinBalance.value)}
            govCost={humanizeNumeral(governanceInUSDC)}
          />
          <MainEconomy
            className={classes.section}
            onBuyBAG={linksToggle}
            onBuyUSDap={togglelinkModal}
          />
          <MainStablecoin
            className={classes.section}
            stablecoinBalance={humanizeNumeral(stablecoinBalance.value)}
            onBuy={togglelinkModal}
            onSell={toggleSellModal}
            onSwap={handleOpenBuyBack}
          />
          <MainStake
            className={classes.section}
            apy={stakingCoupons.value?.map(({ apr }) => apr.year)}
            loading={stakingCoupons.loading}
          />
          <MainStaking
            countOfCards={2}
            className={classes.section}
            staking={stakingList?.slice(0, 2)}
          >
            <StakingSwopFi
              tvl={swopfiItem?.totalLiquidityUSD}
              apy={new BN(swopfiItem?.apr.year ?? '0')
                .multipliedBy(100)
                .toString(10)}
              loading={swopfiLoading}
            />
          </MainStaking>
          <MainEditor className={clsx(classes.section)}>
            <MainAudit
              mixBytesLink="https://github.com/mixbytes/audits_public/tree/4fc7d333e3df57586e0f96cc551819e2c93f3ae9/BondAppetit"
              hashExLink="https://github.com/HashEx/public_audits/tree/7a220efcfb1a4dbe3b79fa24fd6e9c905893c616/BondAppétit/BondAppetit%20report.pdf"
              mixBytesLogo={<MixBytesLogo />}
              hashExLogo={<HashExLogo />}
            />
          </MainEditor>
          <MainSteps className={classes.section} />
          <MainWaves
            className={classes.section}
            onBecomePartner={toggleBecomeAPartner}
          />
          <MainTeam className={classes.section} />
          <div className={classes.articlesWrap}>
            <Typography variant="h2" className={classes.newsTitle}>
              Learn more about BondAppetit
            </Typography>
            <div className={classes.articles}>
              <MainMediumArticles
                loading={mediumArticles.loading}
                articles={mediumArticles.value}
              />
              <MainCointelegraph />
            </div>
          </div>
          <MainNewsResources />
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
        onBuyMarket={handleBuyMarket}
      />
      <LinkModal
        open={linksOpen}
        onClose={linksToggle}
        tokenName={networkConfig.assets.Governance.symbol}
        tokenAddress={networkConfig.assets.Governance.address}
      />
    </>
  );
};
