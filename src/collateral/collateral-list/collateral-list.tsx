import { useToggle } from 'react-use';
import clsx from 'clsx';
import React, { useCallback } from 'react';

import {
  PageWrapper,
  Typography,
  Skeleton,
  Plate,
  Head,
  humanizeNumeral,
  Button,
  useDevMode,
  ButtonBase,
  Modal,
  SmallModal,
  useScrollIntoView
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
  useIssuerRebalance,
  useCollateralRealAssets
} from '../common';

export const CollateralList: React.FC = () => {
  const classes = useCollateralListStyles();

  const [open, toggleOpen] = useToggle(false);

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

  const scrollIntoView = useScrollIntoView('#borrower-check');

  const handleClose = useCallback(() => {
    toggleOpen(false);

    scrollIntoView();
  }, [toggleOpen, scrollIntoView]);

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
                  {stableCoinBalance.loading && !stableCoinBalance ? (
                    <Skeleton />
                  ) : (
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
                  {issuerBalance.loading && !issuerBalance.value ? (
                    <Skeleton />
                  ) : (
                    <>${humanizeNumeral(issuerBalance.value)}</>
                  )}
                </>
              }
              subtitle={
                <ButtonBase className={classes.checkHere} onClick={toggleOpen}>
                  check here
                </ButtonBase>
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
            />
          ) : (
            <CollateralPhases />
          )}
        </PageWrapper>
      </MainLayout>
      <Modal open={open} onClose={toggleOpen}>
        <SmallModal>
          <Button onClick={handleClose}>Ok</Button>
        </SmallModal>
      </Modal>
    </>
  );
};
