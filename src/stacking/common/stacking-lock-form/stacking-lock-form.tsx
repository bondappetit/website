import React from 'react';
import { useFormik } from 'formik';
import IERC20 from '@bondappetit/networks/abi/IERC20.json';
import { AbiItem } from 'web3-utils';
import BN from 'bignumber.js';

import type { Ierc20 } from 'src/generate/IERC20';
import {
  Input,
  Button,
  useStackingContract,
  useNetworkConfig,
  useDynamicContract,
  Typography
} from 'src/common';

export type StackingLockFormProps = {
  account?: string | null;
  tokenId: string;
};

export const StackingLockForm: React.FC<StackingLockFormProps> = (props) => {
  const networkConfig = useNetworkConfig();
  const stackingContract = useStackingContract();
  const getIERC20Contract = useDynamicContract<Ierc20>({
    abi: IERC20.abi as AbiItem[]
  });

  const { account, tokenId } = props;

  const formik = useFormik({
    initialValues: {
      amount: ''
    },
    validateOnBlur: false,
    validateOnChange: false,

    validate: (formValues) => {
      const errors: Partial<typeof formValues> = {};

      if (!formValues.amount) {
        errors.amount = 'required';
      }

      return errors;
    },

    onSubmit: async (formValues, { resetForm }) => {
      if (!networkConfig || !account || !stackingContract) return;

      const currentAsset = networkConfig.assets[tokenId];

      const currentContract = getIERC20Contract(currentAsset.address);
      const formAmount = new BN(formValues.amount)
        .multipliedBy(new BN(10).pow(currentAsset.decimals))
        .toString();

      const approve = currentContract.methods.approve(
        stackingContract.options.address,
        formAmount
      );

      const allowance = await currentContract.methods
        .allowance(account, stackingContract.options.address)
        .call();

      if (allowance !== '0') {
        await currentContract.methods
          .approve(stackingContract.options.address, '0')
          .send({
            from: account,
            gas: await approve.estimateGas()
          });
      }

      await approve.send({
        from: account,
        gas: await approve.estimateGas()
      });

      await stackingContract?.methods
        .lock(currentAsset.address, formAmount)
        .send({
          from: account,
          gas: 2000000
        });
      resetForm();
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Input
          type="text"
          value={formik.values.amount}
          name="amount"
          onChange={formik.handleChange}
          error={Boolean(formik.errors.amount)}
          label="Amount"
        />
        {Boolean(formik.errors.amount) && (
          <Typography variant="body1">{formik.errors.amount}</Typography>
        )}
      </div>
      <Button>Lock</Button>
    </form>
  );
};
