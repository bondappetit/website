import clsx from 'clsx';
import React from 'react';

import { PageWrapper, Typography, Skeleton, Head } from 'src/common';
import { MainLayout } from 'src/layouts';
import { URLS } from 'src/router/urls';
import {
  CollateralCard,
  CollateralTable,
  BORROWERS,
  REPAYMENT,
  CollateralDescription,
  useIssuerBalance
} from '../common';
import { useCollateralDetailStyles } from './collateral-detail.styles';

export const CollateralDetail: React.FC = () => {
  const classes = useCollateralDetailStyles();

  const isserBalance = useIssuerBalance();

  return (
    <>
      <Head title="Tokenomica Malta Ltd" />
      <MainLayout>
        <PageWrapper>
          <div className={classes.section}>
            <CollateralDescription
              backLink={{ to: URLS.collateral.list, title: 'Collaterals' }}
              title="Tokenomica Malta Ltd"
              type="Borrower"
              url="tokenomica.com"
            >
              Tokenomica provides a tailored, cutting-edge solution for
              corporate clients that are willing to enter decentralized finance.
              Aim to help you profit from the growing paradigm, to navigate you
              through the market with ease, and to provide a solution that will
              suit your specific needs.
            </CollateralDescription>
            <div className={clsx(classes.list)}>
              <CollateralCard
                className={classes.card}
                title={<>Value of issued stable coin</>}
                body={
                  <>
                    {!isserBalance && <Skeleton />}
                    {isserBalance && <>$ {isserBalance}</>}
                  </>
                }
              />
              <CollateralCard
                className={classes.card}
                title={<>Outstanding Debt</>}
                body={
                  <>
                    {!isserBalance && <Skeleton />}
                    {isserBalance && <>$ {isserBalance}</>}
                  </>
                }
              />
            </div>
          </div>
          <div className={classes.section}>
            <Typography
              variant="h2"
              align="center"
              className={classes.sectionTitle}
            >
              Collateral of the borrower
            </Typography>
            <CollateralTable data={BORROWERS} />
          </div>
          <div className={classes.section}>
            <Typography
              variant="h2"
              align="center"
              className={classes.sectionTitle}
            >
              Repayment
            </Typography>
            <CollateralTable data={REPAYMENT} />
          </div>
        </PageWrapper>
      </MainLayout>
    </>
  );
};
