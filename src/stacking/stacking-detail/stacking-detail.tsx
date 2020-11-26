import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import { MainLayout } from 'src/layouts';
import { Button, Plate, Typography } from 'src/common';
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
  const [balance] = useStackingBalances([params.tokenId]);

  const unlock = useStackingUnlock(params.tokenId);

  const stackingBalanceIsEmpty = useMemo(() => !Number(balance?.amount), [
    balance
  ]);

  return (
    <MainLayout>
      <div className={classes.staking}>
        <Typography variant="h3">{params.tokenId}</Typography>
        <div className={classes.row}>
          <Plate className={classes.card}>
            <StackingLockForm account={account} tokenId={params.tokenId} />
          </Plate>
          <Plate className={classes.card}>
            {stackingBalanceIsEmpty && (
              <Typography variant="body1">
                your stacking balance is empty
              </Typography>
            )}
            <Button onClick={unlock} disabled={stackingBalanceIsEmpty}>
              Unlock
            </Button>
          </Plate>
        </div>
      </div>
    </MainLayout>
  );
};
