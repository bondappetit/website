import React, { useCallback, useMemo } from 'react';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import { MainLayout } from 'src/layouts';
import { Button, Plate, Typography, Link } from 'src/common';
import { URLS } from 'src/router/urls';
import {
  StackingLockForm,
  useStackingBalances,
  useStackingUnlock
} from 'src/stacking/common';
import { useStackingDetailStyles } from './stacking-detail.styles';

export const StackingDetail: React.FC = () => {
  const classes = useStackingDetailStyles();
  const params = useParams<{ tokenId: string }>();
  const { account } = useWeb3React<Web3>();
  const [[balance], update] = useStackingBalances([params.tokenId]);

  const unlock = useStackingUnlock(params.tokenId);

  const stackingBalanceIsEmpty = useMemo(() => !Number(balance?.amount), [
    balance
  ]);

  const handleUnlock = useCallback(() => {
    unlock().then(update);
  }, [unlock, update]);

  return (
    <MainLayout>
      <div className={classes.staking}>
        <Link component={ReactRouterLink} to={URLS.stacking.list}>
          back
        </Link>
        <Typography variant="h3">{params.tokenId}</Typography>
        <div className={classes.row}>
          <Plate className={classes.card}>
            <StackingLockForm
              account={account}
              tokenId={params.tokenId}
              onSubmit={update}
            />
          </Plate>
          <Plate className={classes.card}>
            {!stackingBalanceIsEmpty && (
              <>
                <Typography variant="body1">
                  your stacking balance {balance.amount}
                </Typography>
                <Typography variant="body1">
                  your reward {balance.reward}
                </Typography>
              </>
            )}
            {stackingBalanceIsEmpty && (
              <Typography variant="body1">
                your stacking balance is empty
              </Typography>
            )}
            <Button onClick={handleUnlock} disabled={stackingBalanceIsEmpty}>
              Unlock
            </Button>
          </Plate>
        </div>
      </div>
    </MainLayout>
  );
};
