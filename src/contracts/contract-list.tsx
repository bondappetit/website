import React from 'react';

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

  return (
    <MainLayout>
      <PageWrapper>
        <ul className={classes.root}>
          {Object.values(networkConfig.contracts ?? {}).map(
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
      </PageWrapper>
    </MainLayout>
  );
};
