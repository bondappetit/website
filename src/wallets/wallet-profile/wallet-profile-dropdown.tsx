import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import React, { forwardRef, useMemo } from 'react';

import {
  BN,
  ButtonBase,
  dateUtils,
  humanizeNumeral,
  Plate,
  Skeleton,
  Typography
} from 'src/common';
import { useStakingTokens } from 'src/staking';
import { useStakingConfig } from 'src/staking-config';
import { WalletButtonWithFallback } from '../wallet-button-with-fallback';
import { useWalletInfo } from './use-wallet-info';
import { WalletProfileRow } from './wallet-profile-row';
import { useWalletProfileStyles } from './wallet-profile.styles';

export type WalletProfileDropdownProps = {
  className?: string;
  onBuy?: () => void;
};

export const WalletProfileDropdown = forwardRef<
  HTMLDivElement,
  WalletProfileDropdownProps
>((props, ref) => {
  const walletInfo = useWalletInfo();

  const classes = useWalletProfileStyles();

  const { account } = useWeb3React();

  const stakingConfig = useStakingConfig();

  const stakingConfigValues = useMemo(() => Object.values(stakingConfig), [
    stakingConfig
  ]);
  const stakingBalancesWithApy = useStakingTokens(stakingConfigValues);

  const claimable = useMemo(() => {
    return stakingBalancesWithApy.value?.reduce<{
      claimableInBag: BN;
      claimableInUSDC: BN;
    }>(
      (acc, { reward, rewardInUSDC }) => {
        return {
          claimableInBag: acc.claimableInBag.plus(reward),
          claimableInUSDC: acc.claimableInUSDC.plus(rewardInUSDC)
        };
      },
      { claimableInBag: new BN(0), claimableInUSDC: new BN(0) }
    );
  }, [stakingBalancesWithApy.value]);

  const loading = !claimable || walletInfo.loading;

  const totalInBag = useMemo(() => {
    if (!claimable?.claimableInBag || !walletInfo.value) return '0';

    return claimable.claimableInBag
      .plus(walletInfo.value.unstaked.inBAG)
      .plus(walletInfo.value.locked.inBAG);
  }, [claimable, walletInfo.value]);

  const totalInUSDC = useMemo(() => {
    if (!claimable?.claimableInUSDC || !walletInfo.value) return '0';

    return claimable.claimableInUSDC
      .plus(walletInfo.value.unstaked.inUSDC)
      .plus(walletInfo.value.locked.inUSDC);
  }, [claimable, walletInfo.value]);

  return (
    <Plate
      className={clsx(classes.plate, classes.row, props.className)}
      ref={ref}
    >
      <div className={clsx(classes.header, classes.row)}>
        <Typography variant="body1">
          {loading ? (
            <Skeleton className={classes.skeleton} />
          ) : (
            `1 BAG = $${humanizeNumeral(walletInfo.value?.governanceInUSDC)}`
          )}
        </Typography>

        <Typography variant="body1" weight="bold">
          {loading ? (
            <Skeleton className={classes.skeleton} />
          ) : (
            <ButtonBase className={classes.buy} onClick={props.onBuy}>
              Buy
            </ButtonBase>
          )}
        </Typography>
      </div>
      {(account || loading) && (
        <>
          <WalletProfileRow
            className={clsx(classes.row, classes.mb8)}
            title="Claimable"
            valueInBag={humanizeNumeral(claimable?.claimableInBag)}
            valueInUSD={humanizeNumeral(claimable?.claimableInUSDC)}
            loading={loading}
          />
          <WalletProfileRow
            className={clsx(classes.row, classes.mb8)}
            title="Unstacked"
            valueInBag={humanizeNumeral(walletInfo.value?.unstaked.inBAG)}
            valueInUSD={humanizeNumeral(walletInfo.value?.unstaked.inUSDC)}
            loading={loading}
          />
          <WalletProfileRow
            className={classes.row}
            title={`Locked till ${dateUtils.formatUnix(
              walletInfo.value?.locked.date ?? '',
              'DD.MM.YYYY'
            )}`}
            valueInBag={humanizeNumeral(walletInfo.value?.locked.inBAG)}
            valueInUSD={humanizeNumeral(walletInfo.value?.locked.inUSDC)}
            loading={loading}
          />
          <WalletProfileRow
            className={clsx(classes.row, classes.footer)}
            title="Total"
            valueInBag={humanizeNumeral(totalInBag)}
            valueInUSD={humanizeNumeral(totalInUSDC)}
            loading={loading}
          />
        </>
      )}
      {!account && !loading && (
        <>
          <Typography variant="body1">
            Connect your wallet to see the stats
          </Typography>
          <WalletButtonWithFallback className={classes.button} />
        </>
      )}
    </Plate>
  );
});

WalletProfileDropdown.displayName = 'WalletProfileDropdown';
