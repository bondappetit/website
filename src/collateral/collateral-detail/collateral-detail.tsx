import clsx from 'clsx';
import React from 'react';

import { PageWrapper, Typography, Skeleton, DocumentList } from 'src/common';
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

const DOCUMENTS = [
  {
    url: '',
    title: 'Document'
  },
  {
    url: '',
    title: 'Document'
  }
];

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
            clients that are willing to enter decentralized finance. Aim to help
            you profit from the growing paradigm, to navigate you through the
            market with ease, and to provide a solution that will suit your
            specific needs.
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
              subtitle={<>14.72% APY</>}
            />
            <CollateralCard
              className={classes.card}
              title={<>Value of Protocol&apos;s assets</>}
              body={
                <>
                  {!isserBalance && <Skeleton />}
                  {isserBalance && <>$ {isserBalance}</>}
                </>
              }
              subtitle={<>8.64% APY</>}
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
        <DocumentList
          documents={DOCUMENTS}
          title={<>Documents</>}
          className={classes.section}
        />
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
