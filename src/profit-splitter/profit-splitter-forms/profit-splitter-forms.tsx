import React from 'react';

import { PageWrapper, useUpdate } from 'src/common';
import { MainLayout } from 'src/layouts';
import { ProfitSplitterDeposit } from '../profit-splitter-deposit';
import { ProfitSplitterBudget } from '../profit-splitter-budget';
import { ProfitSplitterBuyback } from '../profit-splitter-buyback';
import { ProfitSplitterMarket } from '../profit-splitter-market';
import { useProfitSplitterStyles } from './profit-splitter-forms.styles';

export const ProfitSplitterForms: React.FC = () => {
  const classes = useProfitSplitterStyles();

  const [updateCount, handleUpdate] = useUpdate();

  return (
    <MainLayout>
      <PageWrapper>
        <ProfitSplitterDeposit
          updateCount={updateCount}
          handleUpdate={handleUpdate}
          className={classes.form}
        />
        <ProfitSplitterBudget
          updateCount={updateCount}
          handleUpdate={handleUpdate}
          className={classes.form}
        />
        <ProfitSplitterBuyback
          updateCount={updateCount}
          handleUpdate={handleUpdate}
          className={classes.form}
        />
        <ProfitSplitterMarket
          updateCount={updateCount}
          handleUpdate={handleUpdate}
          className={classes.form}
        />
      </PageWrapper>
    </MainLayout>
  );
};
