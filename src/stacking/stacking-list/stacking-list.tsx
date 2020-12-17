import React from 'react';

import { MainLayout } from 'src/layouts';
import { PageWrapper } from 'src/common';
import { StackingCard, useStackingBalances } from 'src/stacking/common';
import { useStackingListStyles } from './stacking-list.styles';

const AVAILABLE_TOKENS = ['ABT', 'Bond'];

export const StackingList: React.FC = () => {
  const classes = useStackingListStyles();
  const [stackingBalances] = useStackingBalances(AVAILABLE_TOKENS);

  return (
    <MainLayout>
      <PageWrapper className={classes.staking}>
        {stackingBalances.map((stackingBalance) => (
          <StackingCard
            key={stackingBalance.name}
            tokenName={stackingBalance.name}
            reward={stackingBalance.reward}
            delta={stackingBalance.delta}
          />
        ))}
      </PageWrapper>
    </MainLayout>
  );
};
