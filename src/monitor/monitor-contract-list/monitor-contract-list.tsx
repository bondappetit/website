import React from 'react';
import { MainLayout } from 'src/layouts';
import { useNetworkConfig } from 'src/common';

export const MonitorContractList: React.FC = () => {
  const networkConfig = useNetworkConfig();
  if (!networkConfig) {
    return <MainLayout>Loading...</MainLayout>;
  }

  return (
    <MainLayout>
      <div>
        <h2>Contracts list</h2>
        <div>
          <ul>
            {Object.values(networkConfig.contracts).map(({ name, address }) => (
              <li key={address}>
                <a
                  href={`${networkConfig.networkEtherscan}/address/${address}`}
                  target="__blank"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};
