import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import React, { useEffect } from 'react';

import { PageWrapper, Plate, Typography } from 'src/common';
import { MainLayout } from 'src/layouts';
import { ReactComponent as EthIcon } from 'src/assets/icons/chains/ethereum.svg';
import { ReactComponent as BnbIcon } from 'src/assets/icons/chains/bnb.svg';
import { config } from 'src/config';
import { WalletButtonWithFallback } from 'src/wallets';
import { BinanceChain } from './binance-chain';
import { useBinanceStyles } from './binance.styles';
import { EthChain } from './eth-chain';
import { setupNetwork } from './setup-binance';

export type BinanceProps = unknown;

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

export const Binance: React.VFC<BinanceProps> = () => {
  const { chainId, account } = useWeb3React();

  const classes = useBinanceStyles();

  // useEffect(() => {
  //   setupNetwork();
  // }, []);

  return (
    <MainLayout>
      <PageWrapper>
        <div className={classes.root}>
          <div>
            <Typography variant="body1" align="center">
              Active Network
            </Typography>
            <div className={classes.tabs}>
              {chains.map((chain) => (
                <div
                  key={chain.title}
                  className={clsx(classes.tabPane, {
                    [classes.tabPaneActive]: chainId
                      ? chain.chainIds.includes(chainId)
                      : false
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
          <Plate className={classes.form}>
            {!account ? (
              <WalletButtonWithFallback />
            ) : (
              <>
                {chainId === 56 && <BinanceChain />}
                {(chainId === 1 || chainId === 3) && <EthChain />}
              </>
            )}
          </Plate>
        </div>
      </PageWrapper>
    </MainLayout>
  );
};
