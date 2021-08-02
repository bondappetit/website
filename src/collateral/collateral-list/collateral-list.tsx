import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import {
  PageWrapper,
  Typography,
  Skeleton,
  Plate,
  Head,
  humanizeNumeral,
  Button,
  useDevMode,
  Modal,
  SmallModal,
  LinkIfAccount,
  useNetworkConfig,
  Link,
  PhaseDescription
} from 'src/common';
import { MainLayout } from 'src/layouts';
import { useStableCoinBalance } from 'src/stablecoin';
import { URLS } from 'src/router/urls';
import { config } from 'src/config';
import { useCollateralListStyles } from './collateral-list.styles';
import {
  CollateralCard,
  useIssuerBalance,
  CollateralProtocolState,
  CollateralPhases,
  CollateralBorrowInfo,
  useIssuerRebalance,
  useCollateralRealAssets
} from '../common';
import { CollateralCheck } from '../collateral-check';

export const CollateralList: React.FC = () => {
  const classes = useCollateralListStyles();

  const networkConfig = useNetworkConfig();

  const [isinCode, setIsinCode] = useState('');

  const [devMode] = useDevMode();

  const stableCoinBalance = useStableCoinBalance();
  const issuerBalance = useIssuerBalance();

  const [result, rebalance] = useIssuerRebalance();

  const handleRebalance = () => {
    rebalance().then(() => {
      issuerBalance.retry();
      stableCoinBalance.retry();
    });
  };

  const tableData = useCollateralRealAssets();

  const handleCloseIsInCode = useCallback(() => {
    setIsinCode('');
  }, []);

  return (
    <>
      <Head title="The protocol’s assets are backed by real-world collateral in the form of bonds" />
      <MainLayout>
        <PageWrapper>
          <Typography variant="h1" align="center" className={classes.title}>
            The protocol’s assets are backed by real-world collateral in the
            form of bonds
          </Typography>
          <PhaseDescription className={classes.phaseDescription} />
          <Plate className={clsx(classes.list, classes.ussued)}>
            <CollateralCard
              className={classes.card}
              title={<>USDap Issued</>}
              body={
                <>
                  {stableCoinBalance.loading && !stableCoinBalance ? (
                    <Skeleton />
                  ) : (
                    <>{humanizeNumeral(stableCoinBalance.value)} USDap</>
                  )}
                </>
              }
              subtitle={<>1 USDap = $1 USD</>}
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
                  {issuerBalance.loading && !issuerBalance.value ? (
                    <Skeleton />
                  ) : (
                    <>${humanizeNumeral(issuerBalance.value)}</>
                  )}
                </>
              }
              subtitle={
                config.IS_COLLATERAL ? (
                  <Link
                    component={ReactRouterLink}
                    to="/whitepaper#13"
                    color="blue"
                  >
                    check here
                  </Link>
                ) : (
                  <LinkIfAccount title="check here">
                    {
                      networkConfig.contracts.StableTokenDepositaryBalanceView
                        .address
                    }
                  </LinkIfAccount>
                )
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
            <CollateralBorrowInfo
              id="borrower-check"
              tableData={tableData.value?.assets}
              onValid={setIsinCode}
            />
          ) : (
            <CollateralPhases />
          )}
        </PageWrapper>
      </MainLayout>
      <Modal
        open={Boolean(isinCode)}
        className={classes.checkModal}
        onClose={handleCloseIsInCode}
      >
        <SmallModal className={clsx(classes.checkModal, classes.overflow)}>
          <CollateralCheck isinCode={isinCode} />
        </SmallModal>
      </Modal>
    </>
  );
};
