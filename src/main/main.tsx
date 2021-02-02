import React, { useCallback, useMemo } from 'react';
import { useToggle } from 'react-use';

import { Head, PageWrapper, LinkModal, useNetworkConfig } from 'src/common';
import { MainLayout } from 'src/layouts';
import { StablecoinMarketModal, useStableCoinBalance } from 'src/stablecoin';
import { useStakingApy, useStakingBalances } from 'src/staking';
import { useStakingConfig } from 'src/staking-config';
import {
  MainStaking,
  MainStablecoin,
  MainCollateral,
  MainVoting,
  MainLinks,
  MainSteps
} from './common';
import { useMainStyles } from './main.styles';

export const Main: React.FC = () => {
  const classes = useMainStyles();

  const stakingConfig = useStakingConfig();

  const fourTokens = useMemo(() => Object.values(stakingConfig).slice(0, 4), [
    stakingConfig
  ]);

  const [stakingBalances] = useStakingBalances(fourTokens);
  const stakingBalancesWithApy = useStakingApy(stakingBalances);

  const networkConfig = useNetworkConfig();

  const stablecoinBalance = useStableCoinBalance();

  const [linkModalOpen, togglelinkModal] = useToggle(false);
  const [marketModalOpen, toggleMarketModal] = useToggle(false);
  const [sellModalOpen, toggleSellModal] = useToggle(false);

  const handleBuy = useCallback(() => {
    togglelinkModal(false);
    toggleMarketModal();
  }, [togglelinkModal, toggleMarketModal]);

  return (
    <>
      <Head
        title="The first DeFi protocol that connects real-world debt instruments with the Ethereum ecosystem."
        ogUrl="https://bondappetit.io"
      />
      <MainLayout>
        <PageWrapper>
          <MainStaking
            className={classes.staking}
            staking={stakingBalancesWithApy}
          />
          <MainStablecoin
            className={classes.stable}
            stablecoinBalance={stablecoinBalance}
            onBuy={togglelinkModal}
            onSell={toggleSellModal}
          />
          <MainCollateral className={classes.collateral} />
          <MainVoting className={classes.voting} />
          <MainSteps className={classes.steps} />
          <MainLinks />
        </PageWrapper>
      </MainLayout>
      <LinkModal
        open={linkModalOpen}
        onClose={togglelinkModal}
        onBuy={handleBuy}
        withBuy
        tokenAddress={networkConfig.assets.Stable.address}
      />
      <LinkModal
        open={sellModalOpen}
        onClose={toggleSellModal}
        tokenAddress={networkConfig.assets.Stable.address}
      />
      <StablecoinMarketModal
        open={marketModalOpen}
        onClose={toggleMarketModal}
        tokenName="USDp"
      />
    </>
  );
};
