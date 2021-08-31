import { useAsyncFn, useAsyncRetry, useUpdateEffect } from 'react-use';
import { useWeb3React } from '@web3-react/core';
import React, { ChangeEvent, useState } from 'react';
import VoteDelegatorAbi from '@bondappetit/networks/abi/VoteDelegator.json';

import { MainLayout } from 'src/layouts';
import type { VoteDelegator } from 'src/generate/VoteDelegator';
import {
  bignumberUtils,
  Button,
  estimateGas,
  humanizeNumeral,
  NumericalInput,
  PageWrapper,
  Plate,
  Typography,
  useGovernanceContract,
  useYieldEscrow,
  useDynamicContract,
  useApprove,
  reset,
  approveAll,
  useGovernanceTokenContract
} from 'src/common';
import { AbiItem } from 'web3-utils';
import { NonPayableTransactionObject } from 'src/generate/types';

export type YieldEscrowProps = unknown;

const DEFAULT_ADDRESS = '0x0000000000000000000000000000000000000000';

export const YieldEscrow: React.VFC<YieldEscrowProps> = () => {
  const governanceContract = useGovernanceContract();
  const yieldEscrowContract = useYieldEscrow();
  const createVoteDelegatorContract = useDynamicContract<VoteDelegator>({
    abi: VoteDelegatorAbi.abi as AbiItem[]
  });
  const governanceTokenContract = useGovernanceTokenContract();
  const [, approvalNeeded] = useApprove();

  const { account = null } = useWeb3React();

  const [deposit, setDeposit] = useState('');
  const [withdraw, setWithdraw] = useState('');

  const handleChange =
    (fn: React.Dispatch<React.SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      fn(event.target.value);
    };

  const createVoteDelegatorMethod = (methodName: 'createVoteDelegator') =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAsyncFn(async () => {
      if (!yieldEscrowContract || !account) return;

      const method = yieldEscrowContract.methods[methodName]();

      return method.send({
        from: account,
        gas: await estimateGas(method as NonPayableTransactionObject<string>, {
          from: account
        })
      });
    }, [yieldEscrowContract, account]);

  const [createvoteDelegatorState, handleCreateVoteDelegator] =
    createVoteDelegatorMethod('createVoteDelegator');

  const delegatorOf = useAsyncRetry(async () => {
    if (!account || !yieldEscrowContract) return;

    return yieldEscrowContract.methods.voteDelegatorOf(account).call();
  }, [account, yieldEscrowContract]);

  const createMethod = (methodName: 'deposit' | 'withdraw', amount: string) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAsyncFn(async () => {
      if (
        !yieldEscrowContract ||
        !account ||
        !amount ||
        !delegatorOf.value ||
        !governanceTokenContract
      )
        return;
      const voteDelegatorContract = createVoteDelegatorContract(
        delegatorOf.value
      );

      const decimals = await yieldEscrowContract.methods.decimals().call();

      const contract =
        delegatorOf.value !== DEFAULT_ADDRESS
          ? voteDelegatorContract
          : yieldEscrowContract;

      const options = {
        token: governanceTokenContract,
        owner: account,
        spender: contract.options.address,
        amount
      };

      if (methodName === 'deposit') {
        const approved = await approvalNeeded(options);

        if (approved.reset) {
          await reset(options);
        }
        if (approved.approve) {
          await approveAll(options);
          await approvalNeeded(options);
          return;
        }
      }

      const methodWithParams = contract.methods[methodName](
        bignumberUtils.toSend(amount, decimals)
      );

      return methodWithParams.send({
        from: account,
        gas: await estimateGas(methodWithParams, { from: account })
      });
    }, [
      yieldEscrowContract,
      account,
      amount,
      delegatorOf.value,
      governanceTokenContract
    ]);

  const [depositState, handleDeposit] = createMethod('deposit', deposit);

  const [withdrawState, handleWithdraw] = createMethod('withdraw', withdraw);

  const balance = useAsyncRetry(async () => {
    if (!account || !governanceContract || !yieldEscrowContract) return;

    return {
      governance: bignumberUtils.fromCall(
        await governanceContract.methods.balanceOf(account).call(),
        await governanceContract.methods.decimals().call()
      ),
      yieldEscrow: bignumberUtils.fromCall(
        await yieldEscrowContract.methods.balanceOf(account).call(),
        await yieldEscrowContract.methods.decimals().call()
      )
    };
  }, [governanceContract, yieldEscrowContract, account]);

  useUpdateEffect(() => {
    delegatorOf.retry();
  }, [createvoteDelegatorState.value]);

  useUpdateEffect(() => {
    balance.retry();
  }, [depositState.value, withdrawState.value]);

  useUpdateEffect(() => {
    if (!depositState.value) return;

    setDeposit('');
  }, [depositState.value]);

  useUpdateEffect(() => {
    if (!withdrawState.value) return;

    setWithdraw('');
  }, [withdrawState.value]);

  return (
    <MainLayout>
      <PageWrapper>
        <Plate style={{ padding: 30 }}>
          <div>
            <Typography>
              BAG balance: {humanizeNumeral(balance.value?.governance)}
            </Typography>
            <NumericalInput
              placeholder="Deposit"
              value={deposit}
              onChange={handleChange(setDeposit)}
              disabled={depositState.loading}
            />
            <Button loading={depositState.loading} onClick={handleDeposit}>
              Deposit
            </Button>
          </div>
          <div>
            <Typography>
              yBAG balance: {humanizeNumeral(balance.value?.yieldEscrow)}
            </Typography>
            <NumericalInput
              placeholder="Withdraw"
              value={withdraw}
              onChange={handleChange(setWithdraw)}
              disabled={withdrawState.loading}
            />
            <Button loading={withdrawState.loading} onClick={handleWithdraw}>
              Withdraw
            </Button>
          </div>
        </Plate>
        {delegatorOf.value && delegatorOf.value === DEFAULT_ADDRESS && (
          <Plate style={{ padding: 30 }}>
            <Typography variant="body1">Vote delegate</Typography>
            <Button
              loading={createvoteDelegatorState.loading}
              onClick={handleCreateVoteDelegator}
            >
              Create
            </Button>
          </Plate>
        )}
      </PageWrapper>
    </MainLayout>
  );
};
