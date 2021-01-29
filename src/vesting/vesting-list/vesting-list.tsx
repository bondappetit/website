import React, { ReactNode } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { MainLayout } from 'src/layouts';
import { useVestingPeriods, Period } from 'src/vesting/common';
import { useVestingContract, dateUtils } from 'src/common';

interface PeriodDetailProps {
  period: Period;
  isMyVesting: boolean;
  account: string | undefined | null;
  onWithdraw: (periodId: string) => void;
}

export const PeriodDetail = ({
  period: { id, amount, date, withdraw },
  isMyVesting,
  account,
  onWithdraw
}: PeriodDetailProps) => {
  const vestingContract = useVestingContract();
  const withdrawHandler = async (periodId: string) => {
    if (!vestingContract || !account) return;

    const withdrawMethod = vestingContract.methods.withdraw(periodId);
    await withdrawMethod.send({
      from: account,
      gas: await withdrawMethod.estimateGas({ from: account })
    });
    onWithdraw(periodId);
  };

  let status: (periodId: string) => ReactNode;
  if (withdraw) {
    status = () => <>Withdrawal</>;
  } else if (isMyVesting && dateUtils.isBeforeNow(date)) {
    status = (periodId: string) => (
      <button onClick={() => withdrawHandler(periodId)}>Withdraw now</button>
    );
  } else {
    status = () => (
      <>Withdrawal at date: {dateUtils.format(date, 'D.M.YYYY HH:mm')}</>
    );
  }

  return (
    <div key={id}>
      <div>Amount: {amount}</div>
      <div>{status(id)}</div>
    </div>
  );
};

interface VestingDetailProps {
  participant: string;
  periods: Period[];
  onWithdraw: (periodId: string) => void;
}

export const VestingDetail = ({
  participant,
  periods,
  onWithdraw
}: VestingDetailProps) => {
  const { account } = useWeb3React<Web3>();
  const isMyVesting = account === participant;

  return (
    <div>
      {isMyVesting ? <h3>You</h3> : <h3>Participant: {participant}</h3>}
      {periods.map((period) => (
        <PeriodDetail
          key={period.id}
          period={period}
          isMyVesting={isMyVesting}
          account={account}
          onWithdraw={onWithdraw}
        />
      ))}
    </div>
  );
};

export const VestingList: React.FC = () => {
  const [vestingPeriods, handleUpdate] = useVestingPeriods();

  return (
    <MainLayout>
      <div>
        {Object.entries(vestingPeriods).map(([participant, periods]) => (
          <VestingDetail
            key={participant}
            participant={participant}
            periods={periods}
            onWithdraw={handleUpdate}
          />
        ))}
      </div>
    </MainLayout>
  );
};
