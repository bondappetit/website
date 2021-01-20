import clsx from 'clsx';
import React from 'react';
import { useToggle } from 'react-use';

import { PageWrapper, Typography, Link, Skeleton, Plate } from 'src/common';
import { MainLayout } from 'src/layouts';
import { useCollateralListStyles } from './collateral-list.styles';
import {
  CollateralTable,
  PROTOCOL_ASSETS,
  CollateralCard,
  useIssuerBalance,
  CollateralProtocolState
} from '../common';
import { useStableCoinBalance } from './use-stable-coin-balance';
import { CollateralMarketModal } from '../collateral-market-modal/collateral-market-modal';

export const CollateralList: React.FC = () => {
  const classes = useCollateralListStyles();

  const issuerBalance = useIssuerBalance();
  const stableCoinBalance = useStableCoinBalance();

  const [open, toggleModal] = useToggle(true);

  return (
    <MainLayout>
      <PageWrapper>
        <Typography variant="h2" align="center" className={classes.title}>
          The assets secured by real world
          <br />
          collateral in form of bonds
        </Typography>
        <Plate variant="dotted" className={clsx(classes.list, classes.section)}>
          <CollateralCard
            className={classes.card}
            head={
              <Typography variant="h5" align="center">
                Value of issued stable coin
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
          <CollateralProtocolState />
          <CollateralCard
            className={classes.card}
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
        </Plate>
        <div className={classes.section}>
          <Typography
            variant="h4"
            align="center"
            className={classes.assetsTitle}
          >
            The assets of the protocol are formed by outstanding debt of the
            <br />
            borrowers, which in turn is secured by real world collateral in form
            of
            <br />
            bonds kept on special security accounts.
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
        <CollateralMarketModal open={open} onClose={toggleModal} />
      </PageWrapper>
    </MainLayout>
  );
};
