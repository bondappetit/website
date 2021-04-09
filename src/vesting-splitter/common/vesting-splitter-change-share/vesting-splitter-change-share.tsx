import { useFormik } from 'formik';
import React from 'react';

import { Button, ButtonBase, Input, isEthAddress } from 'src/common';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-24.svg';
import { useVestingSplitterChangeShareStyles } from './vesting-splitter-change-share.styles';

const betweenOneAndHundred = (share: string | number) =>
  Number(share) > 0 && Number(share) <= 100;

export type VestingSplitterChangeShareProps = {
  onClose: () => void;
  onSubmit: (account: string[], shares: string[]) => Promise<void>;
  accountsWithSharesMap?: Map<string, string>;
};

export const VestingSplitterChangeShare: React.FC<VestingSplitterChangeShareProps> = (
  props
) => {
  const classes = useVestingSplitterChangeShareStyles();

  const formik = useFormik({
    initialValues: {
      accountsWithShares: [...(props.accountsWithSharesMap?.entries() ?? [])]
    },

    validate: (formValues) => {
      const errors: Partial<typeof formValues> = {};

      const result = formValues.accountsWithShares.reduce<{
        accountsWithShares: [string, string][];
        sum: number;
        addresses: string[];
      }>(
        (acc, [account, share]) => {
          const currentErrorArr: [string, string] = ['', ''];

          if (!account) {
            currentErrorArr[0] = 'Specify account, please!';
          }

          if (acc.addresses.includes(account)) {
            currentErrorArr[0] = 'Current address is already specified';
          }

          if (account && !isEthAddress(account)) {
            currentErrorArr[0] = 'Specify ethereum address, please!';
          }

          if (!share) {
            currentErrorArr[1] = 'Specify shares amount, please!';
          }

          if (share && !betweenOneAndHundred(share)) {
            currentErrorArr[1] = 'Shares amount must be between 1 and 100';
          }

          acc.addresses.push(account);

          acc.sum = Number(share) + acc.sum;

          acc.accountsWithShares.push(currentErrorArr);

          return acc;
        },
        {
          accountsWithShares: [],
          sum: 0,
          addresses: []
        }
      );

      if (result.sum !== 100) {
        result.accountsWithShares = result.accountsWithShares.map(
          ([account]) => {
            return [account, 'Sum of shares must be 100'];
          }
        );
      }

      const requiredFields = result.accountsWithShares.some(
        (accountWithShare) =>
          accountWithShare.some((accountOrShare) => !!accountOrShare)
      );

      if (requiredFields) {
        errors.accountsWithShares = result.accountsWithShares;
      }

      return errors;
    },

    onSubmit: async ({ accountsWithShares }) => {
      const { accounts, shares } = accountsWithShares.reduce<{
        accounts: string[];
        shares: string[];
      }>(
        (acc, [account, share]) => {
          acc.accounts.push(account);
          acc.shares.push(String(share));

          return acc;
        },
        { accounts: [], shares: [] }
      );

      await props.onSubmit(accounts, shares);

      props.onClose();
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.root} noValidate>
      {formik.values.accountsWithShares.map(([account, share], index) => {
        const id = String(index);

        return (
          <div key={id}>
            {formik.values.accountsWithShares.length > 1 && (
              <ButtonBase
                type="button"
                onClick={() =>
                  formik.setFieldValue(
                    'accountsWithShares',
                    formik.values.accountsWithShares.filter(
                      (_, accountToRemove) => accountToRemove !== index
                    )
                  )
                }
              >
                <CloseIcon />
              </ButtonBase>
            )}
            <Input
              type="text"
              value={account}
              placeholder="Account"
              name={`accountsWithShares.${index}.0`}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
            />
            <div>{formik.errors.accountsWithShares?.[index]?.[0]}</div>
            <Input
              type="number"
              value={share}
              placeholder="Shares amount"
              name={`accountsWithShares.${index}.1`}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
            />
            <div>{formik.errors.accountsWithShares?.[index]?.[1]}</div>
          </div>
        );
      })}
      <Button
        type="button"
        disabled={formik.isSubmitting}
        onClick={() =>
          formik.setFieldValue(
            `accountsWithShares.${formik.values.accountsWithShares.length}`,
            ['', '']
          )
        }
      >
        Add recepient
      </Button>
      <Button
        type="submit"
        disabled={formik.isSubmitting}
        loading={formik.isSubmitting}
      >
        Save
      </Button>
    </form>
  );
};
