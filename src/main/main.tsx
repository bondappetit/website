import React, { useCallback } from 'react';
import { useToggle } from 'react-use';

import { Head, PageWrapper, LinkModal } from 'src/common';
import { MainLayout } from 'src/layouts';
import { StablecoinMarketModal, useStableCoinBalance } from 'src/stablecoin';
import { useStakingApy, useStakingBalances } from 'src/staking';
import { STAKING_CONFIG } from 'src/staking-config';
import {
  MainStaking,
  MainStablecoin,
  MainCollateral,
  MainVoting,
  MainLinks
} from './common';
import { useMainStyles } from './main.styles';

const staking = STAKING_CONFIG.slice(0, 4);

export const Main: React.FC = () => {
  const classes = useMainStyles();

  const [stakingBalances] = useStakingBalances(staking);
  const stakingBalancesWithApy = useStakingApy(stakingBalances);

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
          <MainLinks />
        </PageWrapper>
      </MainLayout>
      <LinkModal
        open={linkModalOpen}
        onClose={togglelinkModal}
        onBuy={handleBuy}
        withBuy
      />
      <LinkModal open={sellModalOpen} onClose={toggleSellModal} />
      <StablecoinMarketModal
        open={marketModalOpen}
        onClose={toggleMarketModal}
        tokenName="USDp"
      />
    </>
  );
};
