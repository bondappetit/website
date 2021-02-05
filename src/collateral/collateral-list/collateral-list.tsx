import clsx from 'clsx';
import React from 'react';

import {
  PageWrapper,
  Typography,
  Link,
  Skeleton,
  Plate,
  Head
} from 'src/common';
import { MainLayout } from 'src/layouts';
import { useStableCoinBalance } from 'src/stablecoin';
import { useCollateralListStyles } from './collateral-list.styles';
import {
  CollateralCard,
  useIssuerBalance,
  CollateralProtocolState,
  CollateralPhases,
  CollateralBorrowInfo
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
              title={<>Issued stablecoin</>}
              body={
                <>
                  {!stableCoinBalance && <Skeleton />}
                  {stableCoinBalance && <>{stableCoinBalance} USDp</>}
                </>
              }
              subtitle={<>1 USDp = $1 USD</>}
            />
            <CollateralProtocolState />
            <CollateralCard
              className={classes.card}
              title={<>Value of Protocol&apos;s assets</>}
              body={
                <>
                  {!issuerBalance && <Skeleton />}
                  {issuerBalance && <>{issuerBalance} USDC</>}
                </>
              }
              subtitle={
                <Link href="/#" color="blue">
                  check here
                </Link>
              }
            />
          </Plate>
          <CollateralPhases />
          {/* TODO: hide for now */}
          {false && <CollateralBorrowInfo />}
        </PageWrapper>
      </MainLayout>
    </>
  );
};
