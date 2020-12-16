import React from 'react';

import { PageWrapper } from 'src/common';
import { MainLayout } from 'src/layouts';
import { ProfitSplitterDeposit } from '../profit-splitter-deposit';
import { ProfitSplitterBudget } from '../profit-splitter-budget';
import { ProfitSplitterBuyback } from '../profit-splitter-buyback';
import { ProfitSplitterMarket } from '../profit-splitter-market';
import { useProfitSplitterStyles } from './profit-splitter-forms.styles';

export type ProfitSplitterFormsProps = unknown;

export const ProfitSplitterForms: React.FC<ProfitSplitterFormsProps> = () => {
  const classes = useProfitSplitterStyles();

  return (
    <MainLayout>
      <PageWrapper>
        <ProfitSplitterDeposit className={classes.form} />
        <ProfitSplitterBudget className={classes.form} />
        <ProfitSplitterBuyback className={classes.form} />
        <ProfitSplitterMarket className={classes.form} />
      </PageWrapper>
    </MainLayout>
  );
};
