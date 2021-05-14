import React, { useMemo } from 'react';
import networks from '@bondappetit/networks';

import {
  MarkdownCode,
  PageWrapper,
  Typography,
  useNetworkConfig
} from 'src/common';
import { MainLayout } from 'src/layouts';
import { useContractListStyles } from './contract-list.styles';

export type ContractListProps = unknown;

export const ContractList: React.VFC<ContractListProps> = () => {
  const networkConfig = useNetworkConfig();

  const classes = useContractListStyles();

  const contracts = useMemo(
    () => [
      ...Object.values(networkConfig.contracts ?? {}).filter(
        ({ voting }) => voting
      ),
      networkConfig.contracts.GovernorAlpha
    ],
    [networkConfig.contracts]
  );

  return (
    <MainLayout>
      <PageWrapper>
        <div className={classes.root}>
          <Typography variant="h2">Binance contracts</Typography>
          <ul className={classes.list}>
            {Object.values(networks.mainBSC.contracts).map(
              ({ name, address }) => (
                <li key={address}>
                  <div>
                    <Typography variant="h5">{name}</Typography>
                    <MarkdownCode value={address} />
                  </div>
                </li>
              )
            )}
          </ul>
          <Typography variant="h2">Ethereum contracts</Typography>
          <ul className={classes.list}>
            {contracts.map(({ name, address }) => (
              <li key={address}>
                <div>
                  <Typography variant="h5">{name}</Typography>
                  <MarkdownCode value={address} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </PageWrapper>
    </MainLayout>
  );
};
