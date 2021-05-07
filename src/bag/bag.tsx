import React from 'react';

import { PageWrapper } from 'src/common';
import { ContactsFeedback } from 'src/contacts/contacts-feedback/contacts-feedback';
import { MainLayout } from 'src/layouts';
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

  return (
    <MainLayout>
      <PageWrapper>
        <BagHeader className={classes.header} />
        <BagBlocks className={classes.blocks} />
        <BagCalculator className={classes.blocks} />
        <BagInstruction className={classes.blocks} />
        <BagDistribution className={classes.blocks} />
        <BagInvest className={classes.blocks}>
          <ContactsFeedback />
        </BagInvest>
        <BagFaq />
      </PageWrapper>
    </MainLayout>
  );
};
