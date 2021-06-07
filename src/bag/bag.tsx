import React from 'react';
import { useToggle } from 'react-use';

import {
  Head,
  LinkModal,
  PageWrapper,
  useNetworkConfig,
  Faq
} from 'src/common';
import { ContactsFeedback } from 'src/contacts/contacts-feedback';
import { MainLayout } from 'src/layouts';
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
  FAQ
} from './common';

export type BagProps = unknown;

export const Bag: React.VFC<BagProps> = () => {
  const classes = useBagStyles();

  const { leftTokens, totalSupplySum, percent } = useStakingTotal();
  const govTokenCost = useGovernanceCost();

  const [linksOpen, linksToggle] = useToggle(false);

  const networkConfig = useNetworkConfig();

  return (
    <>
      <Head
        title="BondAppétit Governance Token"
        ogUrl="https://bondappetit.io"
      />
      <MainLayout>
        <PageWrapper>
          <BagHeader className={classes.header} />
          <BagBlocks
            className={classes.blocks}
            leftTokens={leftTokens}
            totalSupplySum={totalSupplySum}
            percent={percent}
            govTokenCost={govTokenCost}
            onBuyBag={linksToggle}
          />
          <BagCalculator className={classes.blocks} bagPrice={govTokenCost} />
          <BagInstruction className={classes.blocks} />
          <BagDistribution className={classes.blocks} />
          <BagInvest className={classes.blocks}>
            <ContactsFeedback />
          </BagInvest>
          <Faq title="Learn more about BondAppétit Governance Token (BAG)">
            {FAQ}
          </Faq>
        </PageWrapper>
        <LinkModal
          open={linksOpen}
          onClose={linksToggle}
          tokenName={networkConfig.assets.Governance.symbol}
          tokenAddress={networkConfig.assets.Governance.address}
        />
      </MainLayout>
    </>
  );
};
