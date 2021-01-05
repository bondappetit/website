import clsx from 'clsx';
import React from 'react';

import { PageWrapper, Typography, Link, Skeleton } from 'src/common';
import { MainLayout } from 'src/layouts';
import { useCollateralListStyles } from './collateral-list.styles';
import {
  CollateralTable,
  PROTOCOL_ASSETS,
  CollateralCard,
  useIssuerBalance
} from '../common';
import { useStableCoinBalance } from './use-stable-coin-balance';

export const CollateralList: React.FC = () => {
  const classes = useCollateralListStyles();

  const issuerBalance = useIssuerBalance();
  const stableCoinBalance = useStableCoinBalance();

  return (
    <MainLayout>
      <PageWrapper>
        <Typography variant="h2" align="center" className={classes.title}>
          TableCelle assets of TableCelle protocol are formed by outstanding
          debt of
          <br />
          TableCelle borrowers, which in turn is secured by real world
          collateral
          <br />
          in form of bonds kept on special security accounts.{' '}
        </Typography>
        <div className={clsx(classes.list, classes.section)}>
          <CollateralCard
            head={
              <Typography variant="h5" align="center">
                Vale of issued stable coin
              </Typography>
            }
            body={
              <>
                <Typography variant="h2" align="center">
                  {!stableCoinBalance && <Skeleton />}
                  {stableCoinBalance && <>$ {stableCoinBalance}</>}
                </Typography>
                <Typography variant="body1" align="center">
                  {!stableCoinBalance && <Skeleton />}
                  {stableCoinBalance && (
                    <>
                      {stableCoinBalance} USDp issued
                      <br />1 USDp = 1 USD
                    </>
                  )}
                </Typography>
              </>
            }
          />
          <Typography
            variant="h2"
            align="center"
            component="span"
            className={classes.separator}
          >
            =
          </Typography>
          <CollateralCard
            head={
              <Typography variant="h5" align="center">
                Value of Protocol&apos;s assets
              </Typography>
            }
            body={
              <>
                <Typography variant="h2" align="center">
                  {!issuerBalance && <Skeleton />}
                  {issuerBalance && <>$ {issuerBalance}</>}
                </Typography>
                <Typography variant="body1" align="center">
                  16 assets
                  <br />
                  from 4 issuers
                </Typography>
              </>
            }
          />
        </div>
        <div className={classes.section}>
          <Typography
            variant="h2"
            align="center"
            className={classes.assetsTitle}
          >
            Protocol&apos;s assets
          </Typography>
          <CollateralTable data={PROTOCOL_ASSETS} emptyFirstCol />
        </div>
        <div className={classes.section}>
          <Typography
            variant="h2"
            align="center"
            className={clsx(classes.borrowText, classes.borrowTitle)}
          >
            Borrow from BondAppétit
          </Typography>
          <Typography
            variant="h3"
            align="center"
            className={classes.borrowText}
          >
            BondAppétit provides an opportunity to borrow funds providing
            fixed-income
            <br />
            securities as collateral. Explore terms and benefits of our offer.
          </Typography>
          <Typography align="center" variant="h3">
            <Link href="/" color="blue">
              Explore →
            </Link>
          </Typography>
        </div>
      </PageWrapper>
    </MainLayout>
  );
};
