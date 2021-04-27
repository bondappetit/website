import { useWeb3React } from '@web3-react/core';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useAsyncRetry, useDebounce } from 'react-use';

import {
  approveAll,
  BN,
  estimateGas,
  reset,
  Typography,
  useApprove,
  useBalance,
  useGovernanceTokenContract,
  useIntervalIfHasAccount,
  useNetworkConfig
} from 'src/common';
import { BridgeForm, useBridgeContract, burgerSwapApi } from '../common';

export type EthChainProps = {
  onEthTransit?: (transactionHash: string) => void;
};

export const EthChain: React.VFC<EthChainProps> = (props) => {
  const networkConfig = useNetworkConfig();

  const { account } = useWeb3React();

  const [approve, approvalNeeded] = useApprove();

  const bridgeContract = useBridgeContract();
  const governanceContract = useGovernanceTokenContract();

  const getBalance = useBalance();

  const formik = useFormik({
    initialValues: {
      amount: ''
    },

    validate: (formValues) => {
      const errors: Partial<typeof formValues> = {};

      if (!formValues.amount) {
        errors.amount = 'BAG is required';
      }

      return errors;
    },

    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (formValues, { resetForm }) => {
      const amount = new BN(formValues.amount)
        .multipliedBy(new BN(10).pow(networkConfig.assets.Governance.decimals))
        .toString(10);

      if (!governanceContract || !account) return;

      const options = {
        token: governanceContract,
        owner: account,
        spender: bridgeContract.options.address,
        amount
      };

      const approved = await approvalNeeded(options);

      if (approved.reset) {
        await reset(options);
      }
      if (approved.approve) {
        await approveAll(options);
        await approvalNeeded(options);
        return;
      }

      const transitForBSC = bridgeContract.methods.transitForBSC(
        governanceContract.options.address,
        amount
      );

      transitForBSC
        .send({
          from: account,
          gas: await estimateGas(transitForBSC, { from: account })
        })
        .on('transactionHash', async (transactionHash) => {
          props.onEthTransit?.(transactionHash);

          await burgerSwapApi.ethTransit(transactionHash);
        })
        .on('receipt', () => {
          resetForm();

          return Promise.resolve();
        })
        .on('error', (error) => {
          console.error(error.message);

          return Promise.reject(error.message);
        });
    }
  });

  const balance = useAsyncRetry(async () => {
    if (!governanceContract) return;

    const bbagBalance = await getBalance({
      tokenAddress: governanceContract.options.address
    });

    return bbagBalance.div(
      new BN(10).pow(networkConfig.assets.Governance.decimals)
    );
  }, [governanceContract, networkConfig]);

  useDebounce(
    async () => {
      if (!account || !governanceContract) return;

      const amount = new BN(formik.values.amount)
        .multipliedBy(new BN(10).pow(networkConfig.assets.Governance.decimals))
        .toString(10);

      const options = {
        token: governanceContract,
        owner: account,
        spender: governanceContract.options.address,
        amount
      };

      await approvalNeeded(options);
    },
    200,
    [
      approvalNeeded,
      networkConfig,
      account,
      formik.values.amount,
      governanceContract
    ]
  );

  useIntervalIfHasAccount(balance.retry);

  return (
    <div>
      <Typography variant="body1" align="center">
        Move your BAG to BSC
      </Typography>
      <FormikProvider value={formik}>
        <BridgeForm
          balance={balance.value}
          approve={approve.value?.approve}
          reset={approve.value?.reset}
        />
      </FormikProvider>
    </div>
  );
};
