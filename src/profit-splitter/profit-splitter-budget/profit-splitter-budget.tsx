import clsx from 'clsx';
import React from 'react';

import {
  Button,
  Typography,
  Plate,
  LinkIfAccount,
  useBudgetContract
} from 'src/common';
import { useETHBalance } from './use-eth-balance';
import { usePay } from './use-pay';
import { useRecipients } from './use-recipients';

export type ProfitSplitterBudgetProps = {
  className?: string;
  updateCount: number;
  handleUpdate: () => void;
};

export const ProfitSplitterBudget: React.FC<ProfitSplitterBudgetProps> = (
  props
) => {
  const budgetContract = useBudgetContract();

  const ethBalance = useETHBalance(
    budgetContract.options.address,
    props.updateCount
  );

  const handlePay = usePay(ethBalance, props.handleUpdate);

  const recipients = useRecipients();

  return (
    <Plate className={clsx(props.className)}>
      <Typography variant="h3">Budget</Typography>
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
