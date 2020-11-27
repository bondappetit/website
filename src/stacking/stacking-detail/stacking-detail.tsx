import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import BN from 'bignumber.js';

import { MainLayout } from 'src/layouts';
import {
  Button,
  Plate,
  Typography,
  Link,
  useUniswapRouter,
  useNetworkConfig
} from 'src/common';
import { URLS } from 'src/router/urls';
import {
  StackingLockForm,
  useStackingBalances,
  useStackingUnlock
} from 'src/stacking/common';
import { useStackingDetailStyles } from './stacking-detail.styles';

const BLOCK_PER_YEAR = '2102400';

export const StackingDetail: React.FC = () => {
  const classes = useStackingDetailStyles();
  const params = useParams<{ tokenId: string }>();
  const { account } = useWeb3React<Web3>();
  const [[balance], update] = useStackingBalances([params.tokenId]);
  const uniswapRouter = useUniswapRouter();
  const networkConfig = useNetworkConfig();
  const [APY, setAPY] = useState('');

  const unlock = useStackingUnlock(params.tokenId);

  const stackingBalanceIsEmpty = useMemo(() => !Number(balance?.amount), [
    balance
  ]);

  const handleUnlock = useCallback(() => {
    unlock().then(update);
  }, [unlock, update]);

  const handleGetTokenPrice = useCallback(async () => {
    if (!networkConfig || !uniswapRouter) return;
    // TODO: rewrite for real tokens
    // const currentToken = networkConfig.assets[params.tokenId];

    const amountInUSDT = new BN(10)
      .pow(networkConfig.assets.USDT.decimals)
      .toString(10);
    const amountInDAI = new BN(10)
      .pow(networkConfig.assets.DAI.decimals)
      .toString(10);

    const [
      ,
      ,
      usdtInUSD
    ] = await uniswapRouter.methods
      .getAmountsOut(amountInUSDT, [
        networkConfig.assets.USDT.address,
        networkConfig.assets.WETH.address,
        networkConfig.assets.USDC.address
      ])
      .call();

    const [
      ,
      ,
      daiInUSD
    ] = await uniswapRouter.methods
      .getAmountsOut(amountInDAI, [
        networkConfig.assets.DAI.address,
        networkConfig.assets.WETH.address,
        networkConfig.assets.USDC.address
      ])
      .call();

    if (!balance || !balance?.delta) return;

    const result = new BN(balance.delta)
      .multipliedBy(daiInUSD)
      .multipliedBy(BLOCK_PER_YEAR)
      .div(usdtInUSD);

    setAPY(result.multipliedBy(100).integerValue().toString());
  }, [networkConfig, uniswapRouter, balance]);

  useEffect(() => {
    handleGetTokenPrice();
  }, [handleGetTokenPrice]);

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
            <Typography variant="body1">APY {APY} %</Typography>
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
