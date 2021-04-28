import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import React, { useCallback, useMemo, useState } from 'react';
import {
  useAsyncFn,
  useAsyncRetry,
  useLocalStorage,
  useToggle
} from 'react-use';

import {
  BN,
  Button,
  dateUtils,
  estimateGas,
  humanizeNumeral,
  Link,
  Modal,
  PageWrapper,
  Plate,
  SmallModal,
  Typography,
  useIntervalIfHasAccount,
  useLibrary
} from 'src/common';
import { MainLayout } from 'src/layouts';
import { ReactComponent as EthIcon } from 'src/assets/icons/chains/ethereum.svg';
import { ReactComponent as BnbIcon } from 'src/assets/icons/chains/bnb.svg';
import { ReactComponent as BridgeArrowIcon } from 'src/assets/icons/bridge-arrow.svg';
import { ReactComponent as BurgerSwapLogoIcon } from 'src/assets/icons/burgerswap-logo.svg';
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
    title: 'Ethereum',
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

export const Bridge: React.VFC = () => {
  const { chainId, account } = useWeb3React();
  const library = useLibrary();

  const classes = useBridgeStyles();

  const [open, toggle] = useToggle(false);

  const [
    ethereumTransit,
    setEthereumTransit
  ] = useState<BurgerSwapTransit | null>(null);
  const [
    binancePayback,
    setBinancePayback
  ] = useState<BurgerSwapPayback | null>(null);

  const [transactionToRecieve, setTransactionToRecieve] = useState<
    string | null
  >(null);

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

    return burgerSwapApi.getPaybackList(account);
  }, [account]);

  const transitList = useAsyncRetry(async () => {
    if (!account) return;

    return burgerSwapApi.getTransitList(account);
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

      await withdrawFromBSC
        .send({
          from: account,
          gas: await estimateGas(withdrawFromBSC, { from: account })
        })
        .on('transactionHash', setEthWithdraw)
        .on('receipt', async () => {
          if (ethWithdraw) {
            await burgerSwapApi.ethWithdraw(ethWithdraw);
          }

          return Promise.resolve();
        })
        .on('error', (error) => {
          console.error(error.message);

          return Promise.reject(error.message);
        });
    },
    [account, setEthWithdraw]
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

      await withdrawTransitToken
        .send({
          from: account,
          gas: GAS,
          value: `5${'0'.repeat(16)}`
        })
        .on('transactionHash', setBscWithdraw)
        .on('receipt', async () => {
          if (bscWithdraw) {
            await burgerSwapApi.bscWithdraw(bscWithdraw);
          }

          return Promise.resolve();
        })
        .on('error', (error) => {
          console.error(error.message);

          return Promise.reject(error.message);
        });
    },
    [account, bscWithdraw, setBscWithdraw]
  );

  const latestEthTransit = useAsyncRetry(async () => {
    if (!ethTransit) return;

    const receipt = await library.eth.getTransactionReceipt(ethTransit);

    if (receipt.status) {
      return burgerSwapApi.ethTransit(ethTransit);
    }
  }, [ethTransit, library]);

  const latestEthWithdraw = useAsyncRetry(async () => {
    if (!ethWithdraw) return;

    const receipt = await library.eth.getTransactionReceipt(ethWithdraw);

    if (receipt.status) {
      return burgerSwapApi.ethWithdraw(ethWithdraw);
    }
  }, [ethWithdraw, library]);

  const latestBscPayback = useAsyncRetry(async () => {
    if (!bscPayback) return;

    const receipt = await library.eth.getTransactionReceipt(bscPayback);

    if (receipt.status) {
      return burgerSwapApi.bscPayback(bscPayback);
    }
  }, [bscPayback, library]);

  const latestBscWithdraw = useAsyncRetry(async () => {
    if (!bscWithdraw) return;

    const receipt = await library.eth.getTransactionReceipt(bscWithdraw);

    if (receipt.status) {
      return burgerSwapApi.bscWithdraw(bscWithdraw);
    }
  }, [bscWithdraw, library]);

  const transactions = useMemo(() => {
    const seen = new Set();

    const pendingTransactions = [ethereumTransit, binancePayback].filter(
      (transaction): transaction is BurgerSwapPayback | BurgerSwapTransit =>
        transaction !== null
    );

    return [
      ...pendingTransactions,
      ...(paybackList.value ?? []),
      ...(transitList.value ?? [])
    ]
      .filter((transaction) => {
        const duplicate = isPayback(transaction)
          ? seen.has(transaction.payback_id)
          : seen.has(transaction.transit_id);

        if (isPayback(transaction)) {
          seen.add(transaction.payback_id);
        } else {
          seen.add(transaction.transit_id);
        }

        return !duplicate;
      })
      .sort((a, b) => (dateUtils.after(a.updateTime, b.updateTime) ? -1 : 1));
  }, [transitList.value, paybackList.value, ethereumTransit, binancePayback]);

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

  const loading =
    ((paybackList.loading || transitList.loading) && !paybackList.value) ||
    !transitList.value;

  const handleRecieve = useCallback(
    (transaction: BurgerSwapTransit | BurgerSwapPayback) => {
      if (!config.CHAIN_IDS.includes(currentChainId)) toggle();
      else if (isPayback(transaction)) handleWithdrawFromBSC(transaction);
      else if (!config.CHAIN_BINANCE_IDS.includes(currentChainId))
        setupBinance();
      else handleWithDraw(transaction);

      setTransactionToRecieve(transaction.sign);
    },
    [currentChainId, handleWithDraw, handleWithdrawFromBSC, toggle]
  );

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
                {loading ? (
                  <Typography variant="body1">Loading...</Typography>
                ) : (
                  <>
                    {chainId && config.CHAIN_BINANCE_IDS.includes(chainId) && (
                      <BinanceChain
                        onBscPayback={setBscPayback}
                        bscPayback={bscPayback}
                        onConfirm={setBinancePayback}
                      />
                    )}
                    {chainId && config.CHAIN_IDS.includes(chainId) && (
                      <EthChain
                        onEthTransit={setEthTransit}
                        ethTransit={ethTransit}
                        onConfirm={setEthereumTransit}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </Plate>
          <div className={classes.transactions}>
            {loading && account && (
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
            {(!account || (!transactions.length && !loading)) && (
              <Plate color="grey" withoutBorder className={classes.emptyCard}>
                <Typography
                  variant="h3"
                  className={clsx(classes.emptyCardTitle, classes.typography)}
                >
                  No transactions yet...
                </Typography>
              </Plate>
            )}
            {!loading &&
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
                      {transaction.token}
                    </Typography>
                    <div className={classes.cardStatus}>
                      {!transaction.status && (
                        <Button
                          variant="outlined"
                          className={classes.cardButton}
                          disabled={
                            withdrawfromBscState.loading ||
                            withDrawState.loading
                          }
                          loading={
                            (withdrawfromBscState.loading ||
                              withDrawState.loading) &&
                            transactionToRecieve === transaction.sign
                          }
                          onClick={() => handleRecieve(transaction)}
                        >
                          {isPayback(transaction) ? (
                            <>
                              {!config.CHAIN_IDS.includes(currentChainId)
                                ? 'Change Network'
                                : 'Recieve'}
                            </>
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
                      )}
                      {transaction.status === 1 && (
                        <Typography
                          variant="body1"
                          className={classes.cardStatusTitle}
                        >
                          Recieved
                        </Typography>
                      )}
                      {transaction.status === 3 && (
                        <Typography
                          variant="body1"
                          className={classes.cardStatusTitle}
                        >
                          Pending
                        </Typography>
                      )}
                    </div>
                  </Plate>
                );
              })}
          </div>
          <div className={classes.footer}>
            <Typography variant="body2" align="center">
              We use <BurgerSwapLogoIcon className={classes.footerIcon} />{' '}
              BurgerSwap.{' '}
              <Link color="blue" href="/#">
                Learn more
              </Link>
            </Typography>
            <Typography variant="body2" align="center">
              <Link color="blue" href="/#">
                Lost transaction?
              </Link>
            </Typography>
          </div>
        </div>
        <Modal open={open} onClose={toggle}>
          <SmallModal>
            <Typography variant="h4">Change network to mainnet</Typography>
          </SmallModal>
        </Modal>
      </PageWrapper>
    </MainLayout>
  );
};
