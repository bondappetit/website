import clsx from 'clsx';
import React from 'react';

import { PageWrapper, Typography, Skeleton } from 'src/common';
import { Documents } from 'src/documents';
import { MainLayout } from 'src/layouts';
import { URLS } from 'src/router/urls';
import {
  CollateralCard,
  CollateralTable,
  BORROWERS,
  HISTORY,
  CollateralDescription,
  useIssuerBalance
} from '../common';
import { useCollateralDetailStyles } from './collateral-detail.styles';

export const CollateralDetail: React.FC = () => {
  const classes = useCollateralDetailStyles();

  const isserBalance = useIssuerBalance();

  return (
    <MainLayout>
      <PageWrapper>
        <div className={classes.section}>
          <CollateralDescription
            backLink={{ to: URLS.collateral.list, title: 'Collaterals' }}
            title="Tokenomica Malta Ltd"
            type="Borrower"
            url="tokenomica.com"
          >
            Tokenomica provides a tailored, cutting-edge solution for corporate
            clients that
            <br />
            are willing to enter decentralized finance. Aim to help you profit
            from the growing
            <br />
            paradigm, to navigate you through the market with ease, and to
            provide a solution
            <br />
            that will suit your specific needs.
          </CollateralDescription>
          <div className={clsx(classes.list)}>
            <CollateralCard
              head={
                <Typography variant="h5" align="center">
                  Vale of issued stable coin
                </Typography>
              }
              body={
                <>
                  <Typography variant="h2" align="center">
                    {!isserBalance && <Skeleton />}
                    {isserBalance && <>$ {isserBalance}</>}
                  </Typography>
                  <Typography variant="h5" align="center">
                    14.72% APY
                  </Typography>
                </>
              }
            />
            <CollateralCard
              head={
                <Typography variant="h5" align="center">
                  Value of Protocol&apos;s assets
                </Typography>
              }
              body={
                <>
                  <Typography variant="h2" align="center">
                    {!isserBalance && <Skeleton />}
                    {isserBalance && <>$ {isserBalance}</>}
                  </Typography>
                  <Typography variant="h5" align="center">
                    8.64% APY
                  </Typography>
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
        <Documents title={<>Documents</>} className={classes.section} />
        <div className={classes.section}>
          <Typography
            variant="h2"
            align="center"
            className={classes.sectionTitle}
          >
            Repayment history
          </Typography>
          <CollateralTable data={HISTORY} />
        </div>
      </PageWrapper>
    </MainLayout>
  );
};
