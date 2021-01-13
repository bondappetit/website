import React from 'react';

import { MainLayout } from 'src/layouts';
import { useNetworkConfig, Link, Typography } from 'src/common';
import { useMonitorContractListStyles } from './monitor-contract-list.styles';
import { useInvestStakingBalance } from './use-invest-staking-balance';
import { useMarketBalance } from './use-market-balance';
import { MonitorTokenList } from '../monitor-token-list';

export const MonitorContractList: React.FC = () => {
  const investStakingBalance = useInvestStakingBalance();
  const marketBalances = useMarketBalance();
  const classes = useMonitorContractListStyles();
  const networkConfig = useNetworkConfig();

  return (
    <MainLayout>
      <div className={classes.root}>
        <h2>Contracts list</h2>
        <div>
          <ul className={classes.list}>
            {Object.values(networkConfig.contracts ?? {}).map(
              ({ name, address }) => (
                <li key={address}>
                  <Link
                    href={`${networkConfig.networkEtherscan}/address/${address}`}
                    target="__blank"
                  >
                    {name}
                  </Link>
                </li>
              )
            )}
          </ul>
          <div className={classes.investStaking}>
            {investStakingBalance?.map(({ balance, name }) => (
              <div key={name}>
                {name}: {balance.toFixed(2)}
              </div>
            ))}
          </div>
          <div className={classes.investStaking}>
            {marketBalances?.map(({ balance, name }) => (
              <div key={name}>
                {name}: {balance.toFixed(2)}
              </div>
            ))}
          </div>
          <div>
            <Typography variant="h3">Treasury</Typography>
            <MonitorTokenList
              contractAddress={networkConfig.contracts.Treasury.address}
            />
          </div>
          <div>
            <Typography variant="h3">Timelock</Typography>
            <MonitorTokenList
              contractAddress={networkConfig.contracts.Timelock.address}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
