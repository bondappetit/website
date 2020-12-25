import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';
import { useVestingContract, useUpdate } from 'src/common';

export type Period = {
  id: string;
  amount: string;
  date: number;
  withdraw: boolean;
};

export type PeriodMap = { [address: string]: Period[] };

export const useVestingPeriods = () => {
  const { account } = useWeb3React<Web3>();
  const vestingContract = useVestingContract();
  const [vestingPeriods, setVestingPeriods] = useState<PeriodMap>({});
  const [update, handleUpdate] = useUpdate();

  const handleGetPeriods = useCallback(async () => {
    if (!account) return;

    const participants = await vestingContract.methods.getParticipants().call();
    if (participants === undefined) return;

    setVestingPeriods(
      await participants.reduce(async (mapPromise, participant) => {
        const map = await mapPromise;

        const periods = await vestingContract.methods.info(participant).call();

        return {
          ...map,
          [participant]: periods.map(([id, amount, date, withdraw]) => ({
            id,
            amount,
            date: parseInt(date, 10),
            withdraw
          }))
        };
      }, Promise.resolve({}))
    );
  }, [vestingContract, account]);

  useEffect(() => {
    handleGetPeriods();
  }, [handleGetPeriods, update]);

  return useMemo(
    (): [PeriodMap, () => void] => [vestingPeriods, handleUpdate],
    [vestingPeriods, handleUpdate]
  );
};
