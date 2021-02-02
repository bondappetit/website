import React, { useCallback } from 'react';
import { useToggle } from 'react-use';

import { Head, PageWrapper, LinkModal, useNetworkConfig } from 'src/common';
import { MainLayout } from 'src/layouts';
import {
  StablecoinDecentralized,
  StablecoinEllipse,
  StablecoinFaq,
  StablecoinTable,
  useStablecoinInfo
} from './common';
import { useStablecoinStyles } from './stablecoin.styles';
import { StablecoinMarketModal } from './stablecoin-market-modal';

export const Stablecoin: React.FC = () => {
  const classes = useStablecoinStyles();

  const [linkModalOpen, togglelinkModal] = useToggle(false);
  const [marketModalOpen, toggleMarketModal] = useToggle(false);
  const [sellModalOpen, toggleSellModal] = useToggle(false);

  const stablecoinInfo = useStablecoinInfo();

  const networkConfig = useNetworkConfig();

  const handleBuy = useCallback(() => {
    togglelinkModal(false);
    toggleMarketModal();
  }, [togglelinkModal, toggleMarketModal]);

  return (
    <>
      <Head title="The first-ever decentralized stablecoin based on real-world assets." />
      <MainLayout>
        <PageWrapper>
          <StablecoinEllipse
            className={classes.section}
            onBuy={togglelinkModal}
            onSell={toggleSellModal}
            loading={stablecoinInfo.loading}
            tokenInfo={stablecoinInfo.value}
          />
          <StablecoinDecentralized className={classes.section} />
          <StablecoinTable className={classes.section} />
          <StablecoinFaq className={classes.section} />
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
