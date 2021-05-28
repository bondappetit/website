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

const Card: React.VFC<{ name: string; address: string }> = (props) => (
  <li>
    <div>
      <Typography variant="h5">{props.name}</Typography>
      <MarkdownCode value={props.address} />
    </div>
  </li>
);

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
            <Card
              name={networks.mainBSC.assets.bBAG.symbol}
              address={networks.mainBSC.assets.bBAG.address}
            />
            {Object.values(networks.mainBSC.contracts).map(
              ({ name, address }) => (
                <Card key={address} name={name} address={address} />
              )
            )}
          </ul>
          <Typography variant="h2">Ethereum contracts</Typography>
          <ul className={classes.list}>
            {contracts.map(({ name, address }) => (
              <Card key={address} name={name} address={address} />
            ))}
          </ul>
        </div>
      </PageWrapper>
    </MainLayout>
  );
};
