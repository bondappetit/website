import clsx from 'clsx';
import React from 'react';

import {
  PageWrapper,
  Typography,
  Skeleton,
  Plate,
  Head,
  humanizeNumeral,
  Button,
  LinkIfAccount,
  useNetworkConfig,
  useDevMode
} from 'src/common';
import { MainLayout } from 'src/layouts';
import { useStableCoinBalance } from 'src/stablecoin';
import { config } from 'src/config';
import { useCollateralListStyles } from './collateral-list.styles';
import {
  CollateralCard,
  useIssuerBalance,
  CollateralProtocolState,
  CollateralPhases,
  CollateralBorrowInfo,
  useIssuerRebalance
} from '../common';

export const CollateralList: React.FC = () => {
  const classes = useCollateralListStyles();

  const [devMode] = useDevMode();

  const stableCoinBalance = useStableCoinBalance();
  const issuerBalance = useIssuerBalance();

  const networkConfig = useNetworkConfig();

  const [result, rebalance] = useIssuerRebalance();

  const handleRebalance = () => {
    rebalance().then(() => {
      issuerBalance.retry();
      stableCoinBalance.retry();
    });
  };

  return (
    <>
      <Head title="The protocol’s assets are backed by real-world collateral in the form of bonds" />
      <MainLayout>
        <PageWrapper>
          <Typography variant="h1" align="center" className={classes.title}>
            The protocol’s assets are backed by real-world collateral in the
            form of bonds
          </Typography>
          <Plate className={clsx(classes.list, classes.ussued)}>
            <CollateralCard
              className={classes.card}
              title={<>USDp Issued</>}
              body={
                <>
                  {stableCoinBalance.loading && <Skeleton />}
                  {!stableCoinBalance.loading && (
                    <>{humanizeNumeral(stableCoinBalance.value)} USDp</>
                  )}
                </>
              }
              subtitle={<>1 USDp = $1 USD</>}
            />
            <CollateralProtocolState
              stableCoinBalanceValue={stableCoinBalance.value}
              issuerBalanceValue={issuerBalance.value}
            />
            <CollateralCard
              className={classes.card}
              title={<>Value of Protocol&apos;s assets</>}
              body={
                <>
                  {issuerBalance.loading && <Skeleton />}
                  {!issuerBalance.loading && (
                    <>${humanizeNumeral(issuerBalance.value)}</>
                  )}
                </>
              }
              subtitle={
                <LinkIfAccount title="check here">
                  {
                    networkConfig.contracts.StableTokenDepositaryBalanceView
                      .address
                  }
                </LinkIfAccount>
              }
            />
          </Plate>
          {devMode && (
            <Typography
              variant="inherit"
              component="div"
              className={classes.ussued}
              align="center"
            >
              <Button
                loading={result.loading}
                disabled={result.loading}
                onClick={handleRebalance}
              >
                Rebalance
              </Button>
            </Typography>
          )}
          {config.IS_COLLATERAL ? (
            <CollateralBorrowInfo />
          ) : (
            <CollateralPhases />
          )}
        </PageWrapper>
      </MainLayout>
    </>
  );
};
