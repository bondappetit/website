import React from 'react';

import { MainLayout } from 'src/layouts';
import { useNetworkConfig, Link, Button, Typography } from 'src/common';
import { useMonitorContractListStyles } from './monitor-contract-list.styles';
import { useInvestStackingBalance } from './use-invest-stacking-balance';
import { useMarketBalance } from './use-market-balance';
import { MonitorForm } from '../monitor-form';

export const MonitorContractList: React.FC = () => {
  const [
    investStackingBalance,
    handleLoadInvestStackingBalance
  ] = useInvestStackingBalance();
  const [marketBalances, handleLoadMarketBalances] = useMarketBalance();
  const classes = useMonitorContractListStyles();
  const networkConfig = useNetworkConfig();

  return (
    <MainLayout>
      <div className={classes.root}>
        <h2>Contracts list</h2>
        <div>
          <ul className={classes.list}>
            {Object.values(networkConfig?.contracts ?? {}).map(
              ({ name, address }) => (
                <li key={address}>
                  <Link
                    href={`${networkConfig?.networkEtherscan}/address/${address}`}
                    target="__blank"
                  >
                    {name}
                  </Link>
                </li>
              )
            )}
          </ul>
          <div className={classes.investStacking}>
            {investStackingBalance?.map(({ balance, name }) => (
              <div key={name}>
                {name}: {balance.toFixed(2)}Bond
              </div>
            ))}
            <Button onClick={handleLoadInvestStackingBalance}>Update</Button>
          </div>
          <div className={classes.investStacking}>
            {marketBalances?.map(({ balance, name }) => (
              <div key={name}>
                {name}: {balance.toFixed(2)}
              </div>
            ))}
            <Button onClick={handleLoadMarketBalances}>Update</Button>
          </div>
          <div>
            <Typography variant="h3">Treasury</Typography>
            <MonitorForm
              contractAddress={networkConfig?.contracts.Treasury.address}
            />
          </div>
          <div>
            <Typography variant="h3">Timelock</Typography>
            <MonitorForm
              contractAddress={networkConfig?.contracts.Timelock.address}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
