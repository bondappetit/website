import clsx from 'clsx';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import {
  PageWrapper,
  Typography,
  Link,
  Skeleton,
  Plate,
  Head
} from 'src/common';
import { MainLayout } from 'src/layouts';
import { URLS } from 'src/router/urls';
import { useStableCoinBalance } from 'src/stablecoin';
import { useCollateralListStyles } from './collateral-list.styles';
import {
  CollateralTable,
  PROTOCOL_ASSETS,
  CollateralCard,
  useIssuerBalance,
  CollateralProtocolState
} from '../common';

export const CollateralList: React.FC = () => {
  const classes = useCollateralListStyles();

  const issuerBalance = useIssuerBalance();
  const stableCoinBalance = useStableCoinBalance();

  return (
    <>
      <Head title="The assets secured by real world collateral in form of bonds" />
      <MainLayout>
        <PageWrapper>
          <Typography variant="h1" align="center" className={classes.title}>
            The assets secured by real world collateral in form of bonds
          </Typography>
          <Plate className={clsx(classes.list, classes.ussued)}>
            <CollateralCard
              className={classes.card}
              title={<>Value of issued stable coin</>}
              body={
                <>
                  {!stableCoinBalance && <Skeleton />}
                  {stableCoinBalance && <>$ {stableCoinBalance}</>}
                </>
              }
              subtitle={
                <>
                  {!stableCoinBalance && <Skeleton />}
                  {stableCoinBalance && (
                    <>
                      {stableCoinBalance} USDp issued
                      <br />1 USDp = 1 USD
                    </>
                  )}
                </>
              }
            />
            <CollateralProtocolState />
            <CollateralCard
              className={classes.card}
              title={<>Value of Protocol&apos;s assets</>}
              body={
                <>
                  {!issuerBalance && <Skeleton />}
                  {issuerBalance && <>$ {issuerBalance}</>}
                </>
              }
              subtitle={
                <>
                  0 assets from 1 issuers
                  <br />
                  <Link href="/#" color="blue">
                    check here
                  </Link>
                </>
              }
            />
          </Plate>
          <div className={classes.section}>
            <Typography
              variant="h4"
              align="center"
              className={classes.assetsTitle}
            >
              The assets of the protocol are formed by outstanding debt of the
              borrowers, which in turn is secured by real world collateral in
              form of bonds kept on special security accounts.
            </Typography>
            <CollateralTable data={PROTOCOL_ASSETS} emptyFirstCol />
          </div>
          <div className={classes.section}>
            <Typography
              variant="h1"
              component="h2"
              align="center"
              className={clsx(classes.borrowText)}
            >
              Borrow from BondAppétit
            </Typography>
            <Typography
              variant="h4"
              align="center"
              className={classes.borrowText}
            >
              BondAppétit provides an opportunity to borrow funds providing
              fixed-income
              <br />
              securities as collateral. Explore terms and benefits of our offer.
            </Typography>
            <Typography align="center" variant="h3">
              <Link
                color="blue"
                component={ReactRouterLink}
                to={URLS.collateral.borrow}
              >
                Explore →
              </Link>
            </Typography>
          </div>
        </PageWrapper>
      </MainLayout>
    </>
  );
};
