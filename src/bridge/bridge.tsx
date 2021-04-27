import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { useAsyncFn, useAsyncRetry, useLocalStorage } from 'react-use';

import {
  BN,
  Button,
  dateUtils,
  estimateGas,
  humanizeNumeral,
  PageWrapper,
  Plate,
  Typography,
  useIntervalIfHasAccount,
  useLibrary
} from 'src/common';
import { MainLayout } from 'src/layouts';
import { ReactComponent as EthIcon } from 'src/assets/icons/chains/ethereum.svg';
import { ReactComponent as BnbIcon } from 'src/assets/icons/chains/bnb.svg';
import { ReactComponent as BridgeArrowIcon } from 'src/assets/icons/bridge-arrow.svg';
import { config } from 'src/config';
import { WalletButtonWithFallback } from 'src/wallets';
import { BinanceChain } from './binance-chain';
import { useBridgeStyles } from './bridge.styles';
import { EthChain } from './ethereum-chain';
import {
  burgerSwapApi,
  BurgerSwapPayback,
  BurgerSwapTransit,
  setupBinance,
  useBridgeContract,
  useTransitContract
} from './common';

const GAS = 120000;

const chains = [
  {
    title: 'Etherium',
    contractName: 'ERC20',
    icon: EthIcon,
    chainIds: config.CHAIN_IDS
  },
  {
    title: 'Binance',
    contractName: 'BEP20',
    icon: BnbIcon,
    chainIds: config.CHAIN_BINANCE_IDS
  }
];

const isPayback = (
  item: BurgerSwapPayback | BurgerSwapTransit
): item is BurgerSwapPayback => {
  return 'payback_id' in item;
};

const ACCOUNT = '0x6Eff5218f3EBB8A813539DBA87bD5c7D4d2B3dcc';

export const Bridge: React.VFC = () => {
  const { chainId, account } = useWeb3React();
  const library = useLibrary();

  const classes = useBridgeStyles();

  const [ethTransit, setEthTransit] = useLocalStorage<string | null>(
    'ethTransit',
    null
  );
  const [ethWithdraw, setEthWithdraw] = useLocalStorage<string | null>(
    'ethWithdraw',
    null
  );
  const [bscWithdraw, setBscWithdraw] = useLocalStorage<string | null>(
    'bscWithdraw',
    null
  );
  const [bscPayback, setBscPayback] = useLocalStorage<string | null>(
    'bscPayback',
    null
  );

  const paybackList = useAsyncRetry(async () => {
    if (!account) return;

    return burgerSwapApi.getPaybackList(ACCOUNT);
  }, [account]);

  const transitList = useAsyncRetry(async () => {
    if (!account) return;

    return burgerSwapApi.getTransitList(ACCOUNT);
  }, [account]);

  const bridgeContract = useBridgeContract();
  const transitContract = useTransitContract();

  const [withdrawfromBscState, handleWithdrawFromBSC] = useAsyncFn(
    async (payback: BurgerSwapPayback) => {
      if (!account) return;

      const withdrawFromBSC = bridgeContract.methods.withdrawFromBSC(
        payback.sign,
        payback.payback_id,
        payback.token,
        payback.amount
      );

      withdrawFromBSC
        .send({
          from: account,
          gas: await estimateGas(withdrawFromBSC, { from: account })
        })
        .on('transactionHash', async (transactionHash) => {
          setEthWithdraw(transactionHash);
          await burgerSwapApi.ethWithdraw(transactionHash);
        })
        .on('receipt', async () => {
          return Promise.resolve();
        })
        .on('error', (error) => {
          console.error(error.message);

          return Promise.reject(error.message);
        });
    },
    [account]
  );

  const [withDrawState, handleWithDraw] = useAsyncFn(
    async (transit: BurgerSwapTransit) => {
      if (!account) return;

      const withdrawTransitToken = transitContract.methods.withdrawTransitToken(
        transit.sign,
        transit.transit_id,
        transit.amount,
        transit.token,
        transit.name,
        transit.symbol,
        transit.decimals
      );

      withdrawTransitToken
        .send({
          from: account,
          gas: GAS,
          value: `5${'0'.repeat(16)}`
        })
        .on('transactionHash', async (transactionHash) => {
          setBscWithdraw(transactionHash);

          await burgerSwapApi.bscWithdraw(transactionHash);
        })
        .on('receipt', async () => {
          return Promise.resolve();
        })
        .on('error', (error) => {
          console.error(error.message);

          return Promise.reject(error.message);
        });
    },
    [account]
  );

  const latestEthTransit = useAsyncRetry(async () => {
    if (!ethTransit) return;

    const receipt = await library.eth.getTransactionReceipt(ethTransit);

    if (receipt.status) {
      await burgerSwapApi.ethTransit(ethTransit);
    }

    return receipt;
  }, [ethTransit, library]);

  const latestEthWithdraw = useAsyncRetry(async () => {
    if (!ethWithdraw) return;

    const receipt = await library.eth.getTransactionReceipt(ethWithdraw);

    if (receipt.status) {
      await burgerSwapApi.ethWithdraw(ethWithdraw);
    }

    return receipt;
  }, [ethWithdraw, library]);

  const latestBscPayback = useAsyncRetry(async () => {
    if (!bscPayback) return;

    const receipt = await library.eth.getTransactionReceipt(bscPayback);

    if (receipt.status) {
      await burgerSwapApi.bscPayback(bscPayback);
    }

    return receipt;
  }, [bscPayback, library]);

  const latestBscWithdraw = useAsyncRetry(async () => {
    if (!bscWithdraw) return;

    const receipt = await library.eth.getTransactionReceipt(bscWithdraw);

    if (receipt.status) {
      await burgerSwapApi.bscWithdraw(bscWithdraw);
    }

    return receipt;
  }, [bscWithdraw, library]);

  const transactions = useMemo(
    () =>
      [
        ...(paybackList.value ?? []),
        ...(transitList.value ?? [])
      ].sort((a, b) => (dateUtils.after(a.updateTime, b.updateTime) ? -1 : 1)),
    [transitList.value, paybackList.value]
  );

  const currentChainId = Number(chainId ?? config.DEFAULT_CHAIN_ID);

  useIntervalIfHasAccount(() => {
    paybackList.retry();
    transitList.retry();

    if (
      config.CHAIN_IDS.includes(currentChainId) &&
      !latestEthTransit.value?.status &&
      !latestEthWithdraw.value?.status
    ) {
      latestEthWithdraw.retry();
      latestEthTransit.retry();
    }

    if (
      config.CHAIN_BINANCE_IDS.includes(currentChainId) &&
      !latestBscPayback.value?.status &&
      !latestBscWithdraw.value?.status
    ) {
      latestBscPayback.retry();
      latestBscWithdraw.retry();
    }
  });

  return (
    <MainLayout>
      <PageWrapper>
        <div className={classes.root}>
          <div>
            <Typography variant="body1" align="center">
              Active Network
            </Typography>
            <div className={clsx(classes.tabs, classes.mb)}>
              {chains.map((chain) => (
                <div
                  key={chain.title}
                  className={clsx(classes.tabPane, {
                    [classes.tabPaneActive]: chain.chainIds.includes(
                      currentChainId
                    )
                  })}
                >
                  <chain.icon className={classes.tabIcon} />
                  <div>
                    <Typography variant="h3">{chain.title}</Typography>
                    <Typography
                      variant="body1"
                      className={classes.contractName}
                    >
                      {chain.contractName}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Plate className={clsx(classes.form, classes.mb)}>
            {!account ? (
              <WalletButtonWithFallback />
            ) : (
              <>
                {paybackList.loading || transitList.loading ? (
                  <Typography variant="body1">Loading...</Typography>
                ) : (
                  <>
                    {chainId && config.CHAIN_BINANCE_IDS.includes(chainId) && (
                      <BinanceChain onBscPayback={setBscPayback} />
                    )}
                    {chainId && config.CHAIN_IDS.includes(chainId) && (
                      <EthChain onEthTransit={setEthTransit} />
                    )}
                  </>
                )}
              </>
            )}
          </Plate>
          <div>
            {(paybackList.loading || transitList.loading) && (
              <Plate color="grey" withoutBorder className={classes.emptyCard}>
                <Typography
                  variant="h3"
                  className={classes.typography}
                  align="center"
                >
                  Loading...
                </Typography>
              </Plate>
            )}
            {!transactions.length &&
              !(paybackList.loading || transitList.loading) && (
                <Plate color="grey" withoutBorder className={classes.emptyCard}>
                  <Typography
                    variant="h3"
                    className={clsx(classes.emptyCardTitle, classes.typography)}
                  >
                    No transactions yet...
                  </Typography>
                </Plate>
              )}
            {!(paybackList.loading || transitList.loading) &&
              transactions.map((transaction, index) => {
                const key = `${transaction.id}-${index}`;

                return (
                  <Plate
                    color="grey"
                    withoutBorder
                    className={classes.card}
                    key={key}
                  >
                    <div className={classes.cardIcons}>
                      {isPayback(transaction) ? (
                        <BnbIcon className={classes.cardIcon} />
                      ) : (
                        <EthIcon className={classes.cardIcon} />
                      )}
                      <BridgeArrowIcon className={classes.cardArrow} />
                      {isPayback(transaction) ? (
                        <EthIcon className={classes.cardIcon} />
                      ) : (
                        <BnbIcon className={classes.cardIcon} />
                      )}
                    </div>
                    <Typography variant="h3" className={classes.typography}>
                      {humanizeNumeral(
                        new BN(transaction.amount).div(new BN(10).pow(18))
                      )}{' '}
                      {isPayback(transaction) ? 'bBAG' : 'BAG'}
                    </Typography>
                    <div className={classes.cardStatus}>
                      {!transaction.status ? (
                        <Button
                          variant="outlined"
                          className={classes.cardButton}
                          disabled={
                            withdrawfromBscState.loading ||
                            withDrawState.loading
                          }
                          loading={
                            withdrawfromBscState.loading ||
                            withDrawState.loading
                          }
                          onClick={() => {
                            if (isPayback(transaction))
                              handleWithdrawFromBSC(transaction);
                            else if (
                              !config.CHAIN_BINANCE_IDS.includes(currentChainId)
                            )
                              setupBinance();
                            else handleWithDraw(transaction);
                          }}
                        >
                          {isPayback(transaction) ? (
                            <>Recieve</>
                          ) : (
                            <>
                              {!config.CHAIN_BINANCE_IDS.includes(
                                currentChainId
                              )
                                ? 'Change Network'
                                : 'Recieve'}
                            </>
                          )}
                        </Button>
                      ) : (
                        <Typography
                          variant="body1"
                          className={classes.cardStatusTitle}
                        >
                          Recieved
                        </Typography>
                      )}
                    </div>
                  </Plate>
                );
              })}
          </div>
        </div>
      </PageWrapper>
    </MainLayout>
  );
};
