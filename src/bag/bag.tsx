import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { useToggle } from 'react-use';

import {
  LinkModal,
  PageWrapper,
  useChangeNetworkModal,
  useNetworkConfig
} from 'src/common';
import { config } from 'src/config';
import { ContactsFeedback } from 'src/contacts/contacts-feedback/contacts-feedback';
import { MainLayout } from 'src/layouts';
import { StablecoinCollateralMarketModal } from 'src/stablecoin';
import { useGovernanceCost } from 'src/staking';
import { useStakingTotal } from 'src/voting/voting-staking';
import { useBagStyles } from './bag.styles';
import {
  BagBlocks,
  BagCalculator,
  BagDistribution,
  BagHeader,
  BagInstruction,
  BagInvest,
  BagFaq
} from './common';

export type BagProps = unknown;

export const Bag: React.VFC<BagProps> = () => {
  const classes = useBagStyles();

  const { chainId } = useWeb3React();

  const { leftTokens, totalSupplySum, percent } = useStakingTotal();
  const govTokenCost = useGovernanceCost();

  const [collateralOpen, collateralToggle] = useToggle(false);
  const [linksOpen, linksToggle] = useToggle(false);

  const [openChangeNetwork] = useChangeNetworkModal();

  const handleClose = () => {
    linksToggle(false);
    collateralToggle(true);
  };

  const networkConfig = useNetworkConfig();

  return (
    <MainLayout>
      <PageWrapper>
        <BagHeader className={classes.header} />
        <BagBlocks
          className={classes.blocks}
          leftTokens={leftTokens}
          totalSupplySum={totalSupplySum}
          percent={percent}
          govTokenCost={govTokenCost}
          onBuyBag={
            !config.CHAIN_IDS.includes(Number(chainId))
              ? openChangeNetwork
              : linksToggle
          }
        />
        <BagCalculator className={classes.blocks} bagPrice={govTokenCost} />
        <BagInstruction className={classes.blocks} />
        <BagDistribution className={classes.blocks} />
        <BagInvest className={classes.blocks}>
          <ContactsFeedback />
        </BagInvest>
        <BagFaq />
      </PageWrapper>
      <LinkModal
        open={linksOpen}
        withBuyCollateralMarket
        onClose={linksToggle}
        onBuyCollateralMarket={handleClose}
        tokenName={networkConfig.assets.Stable.symbol}
        tokenAddress={networkConfig.assets.Stable.address}
      />
      {collateralOpen && (
        <StablecoinCollateralMarketModal
          open={collateralOpen}
          onClose={collateralToggle}
          tokenName="USDap"
        />
      )}
    </MainLayout>
  );
};
