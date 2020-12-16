import clsx from 'clsx';
import React from 'react';

import { Button, Typography, Plate, LinkIfAccount } from 'src/common';
import { useETHBalance } from './use-eth-balance';
import { usePay } from './use-pay';
import { useRecipients } from './use-recipients';

export type ProfitSplitterBudgetProps = {
  className?: string;
};

export const ProfitSplitterBudget: React.FC<ProfitSplitterBudgetProps> = (
  props
) => {
  const ethBalance = useETHBalance();

  const handlePay = usePay(ethBalance);

  const recipients = useRecipients();

  return (
    <Plate className={clsx(props.className)}>
      <Typography variant="body1">Balance: {ethBalance} ETH</Typography>
      <Button onClick={handlePay}>Pay</Button>
      {!!recipients.length && (
        <div>
          <Typography variant="h5">Recipients: </Typography>
          <ul>
            {recipients.map((recipient) => (
              <li key={recipient}>
                <LinkIfAccount>{recipient}</LinkIfAccount>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Plate>
  );
};
