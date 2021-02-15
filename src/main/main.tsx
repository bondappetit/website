import React, { useCallback, useMemo } from 'react';
import { useToggle } from 'react-use';
import clsx from 'clsx';

import { Head, PageWrapper, LinkModal, useNetworkConfig } from 'src/common';
import { ReactComponent as MixBytesLogo } from 'src/assets/icons/mix-bytes.svg';
import { MainLayout } from 'src/layouts';
import { StablecoinMarketModal, useStableCoinBalance } from 'src/stablecoin';
import {
  useStakingApy,
  useStakingBalances,
  useTotalValueLocked
} from 'src/staking';
import { useStakingConfig } from 'src/staking-config';
import {
  MainStaking,
  MainStablecoin,
  MainCollateral,
  MainVoting,
  MainSteps,
  MainEditor,
  MainAudit
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

  const totalValueLocked = useTotalValueLocked(stakingBalancesWithApy);

  return (
    <>
      <Head
        title="The first DeFi protocol that connects real-world debt instruments with the Ethereum ecosystem."
        ogUrl="https://bondappetit.io"
      />
      <MainLayout>
        <PageWrapper className={classes.root}>
          <MainStaking
            className={classes.staking}
            staking={stakingBalancesWithApy}
            totalValueLocked={totalValueLocked.toFormat(2)}
          />
          <MainStablecoin
            className={classes.stable}
            stablecoinBalance={stablecoinBalance}
            onBuy={togglelinkModal}
            onSell={toggleSellModal}
          />
          <MainCollateral className={classes.section} />
          <MainAudit
            className={clsx(classes.section, classes.audit)}
            companyLogo={<MixBytesLogo />}
          />
          <MainSteps className={classes.steps} />
          <MainEditor className={classes.editor} />
          <MainVoting />
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
