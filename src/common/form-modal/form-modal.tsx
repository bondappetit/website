import { useFormikContext } from 'formik';
import React, { useMemo, useCallback } from 'react';
import { useToggle, useHover } from 'react-use';
import { useWeb3React } from '@web3-react/core';
import Tippy from '@tippyjs/react';

import { ReactComponent as HelpIcon } from 'src/assets/icons/help.svg';
import { ButtonBase } from '../button-base';
import { Typography } from '../typography';
import { Button } from '../button';
import { Input } from '../input';
import { SmallModal } from '../small-modal';
import { Modal } from '../modal';
import { FormModalSelect, Asset } from './form-modal-select';
import { useFormModalStyles } from './form-modal.styles';

export type FormModalValues = {
  currency: string;
  amount: string;
};

export type FormModalProps = {
  open: boolean;
  onClose: () => void;
  tokenName: string;
  tokens: Asset[];
  result: string;
  balance: string;
  openWalletListModal: () => void;
};

export const FormModal: React.FC<FormModalProps> = (props) => {
  const classes = useFormModalStyles();

  const { account } = useWeb3React();

  const [select, toggleSelect] = useToggle(false);

  const formik = useFormikContext<FormModalValues>();

  const currentToken = useMemo(() => {
    return props.tokens.find(({ symbol }) => symbol === formik.values.currency);
  }, [formik.values.currency, props.tokens]);

  const handleOpenWalletList = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      props.openWalletListModal();
    },
    [props]
  );

  const tooltip = (isHovering: boolean) => (
    <span>
      <Tippy
        visible={isHovering}
        content="The given price is not exact, as the final price will be calculated based on the current USDC conversion rate on Uniswap"
        maxWidth={280}
        offset={[140, 8]}
        className={classes.tippy}
      >
        <ButtonBase className={classes.hintButton}>
          <HelpIcon />
        </ButtonBase>
      </Tippy>
    </span>
  );

  const [hoverable] = useHover(tooltip);

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.onClose}
        onBack={select ? toggleSelect : undefined}
      >
        <SmallModal>
          {select && (
            <FormModalSelect
              value={formik.values.currency}
              options={props.tokens}
              onChange={(value: string) => {
                formik.setFieldValue('currency', value);
                toggleSelect();
              }}
            />
          )}
          {!select && (
            <form
              onSubmit={!account ? handleOpenWalletList : formik.handleSubmit}
              className={classes.root}
            >
              <div className={classes.inputs}>
                <div className={classes.row}>
                  <Input
                    name="amount"
                    label="You spent"
                    placeholder="0.0"
                    disabled={formik.isSubmitting}
                    value={formik.values.amount}
                    className={classes.input}
                    onChange={formik.handleChange}
                  />
                  <div className={classes.input}>
                    <Typography variant="body1" component="div">
                      Balance: {currentToken?.balance}
                    </Typography>
                    <ButtonBase
                      type="button"
                      disabled={formik.isSubmitting}
                      className={classes.selectButton}
                      onClick={toggleSelect}
                    >
                      {formik.values.currency}↓
                    </ButtonBase>
                  </div>
                </div>
                <div className={classes.row}>
                  <Input
                    label="You will get"
                    readOnly
                    placeholder="0.0"
                    className={classes.input}
                    value={props.result}
                  />
                  <div className={classes.input}>
                    <Typography variant="body1" component="div">
                      Balance: {props.balance}
                    </Typography>
                    <Typography variant="inherit" component="div">
                      {props.tokenName}
                    </Typography>
                  </div>
                </div>
              </div>
              <Typography
                variant="body1"
                align="center"
                className={classes.hint}
              >
                1.12 {formik.values.currency} per {props.tokenName}, estimated
                price
                {hoverable}
              </Typography>
              <Button
                type="submit"
                disabled={
                  Boolean(formik.errors.amount || formik.errors.currency) ||
                  formik.isSubmitting
                }
                loading={formik.isSubmitting}
              >
                {!account
                  ? 'Connect Wallet'
                  : formik.errors.amount || formik.errors.currency || 'Buy'}
              </Button>
            </form>
          )}
        </SmallModal>
      </Modal>
    </>
  );
};
