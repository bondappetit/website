import React, { useCallback } from 'react';
import { useToggle } from 'react-use';

import { PageWrapper } from 'src/common';
import { MainLayout } from 'src/layouts';
import {
  StablecoinDecentralized,
  StablecoinEllipse,
  StablecoinFaq,
  StablecoinTable,
  StablecoinLinkModal
} from './common';
import { useStablecoinStyles } from './stablecoin.styles';
import { StablecoinMarketModal } from './stablecoin-market-modal';

export const Stablecoin: React.FC = () => {
  const classes = useStablecoinStyles();

  const [linkModalOpen, togglelinkModal] = useToggle(false);
  const [marketModalOpen, toggleMarketModal] = useToggle(false);
  const [sellModalOpen, toggleSellModal] = useToggle(false);

  const handleBuy = useCallback(() => {
    togglelinkModal(false);
    toggleMarketModal();
  }, [togglelinkModal, toggleMarketModal]);

  return (
    <>
      <MainLayout>
        <PageWrapper>
          <StablecoinEllipse
            className={classes.section}
            onBuy={togglelinkModal}
            onSell={toggleSellModal}
          />
          <StablecoinDecentralized className={classes.section} />
          <StablecoinTable className={classes.section} />
          <StablecoinFaq className={classes.section} />
        </PageWrapper>
      </MainLayout>
      <StablecoinLinkModal
        open={linkModalOpen}
        onClose={togglelinkModal}
        onBuy={handleBuy}
        withBuy
      />
      <StablecoinLinkModal open={sellModalOpen} onClose={toggleSellModal} />
      <StablecoinMarketModal
        open={marketModalOpen}
        onClose={toggleMarketModal}
        tokenName="USDp"
      />
    </>
  );
};
