import React from 'react';

import { Typography } from 'src/common';
import { useTokensBalance } from './use-token-balance';

export type MonitorTokenListProps = {
  contractAddress?: string;
};

export const MonitorTokenList: React.FC<MonitorTokenListProps> = (props) => {
  const balances = useTokensBalance(props.contractAddress);

  return (
    <div>
      {balances.map((balance) => (
        <Typography variant="body1" key={balance.symbol}>
          {balance.symbol}: {balance.balance}
        </Typography>
      ))}
    </div>
  );
};