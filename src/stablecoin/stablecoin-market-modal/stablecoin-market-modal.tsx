import { useFormik, FormikContext } from 'formik';
import React, { useCallback, useState } from 'react';
import { useDebounce, useToggle } from 'react-use';
import type { Ierc20 } from 'src/generate/IERC20';
import IERC20 from '@bondappetit/networks/abi/IERC20.json';
import type { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { WalletModal } from 'src/wallets';
import {
  useCollateralMarketContract,
  useNetworkConfig,
  useBalance,
  useDynamicContract,
  FormModal,
  Modal,
  SmallModal,
  InfoCardFailure,
  InfoCardLoader,
  InfoCardSuccess,
  BN,
  useTimeoutInterval
} from 'src/common';
import { useGovernanceCost } from 'src/staking';
import { useStablecoinTokens } from './use-stablecoin-tokens';

export type StablecoinMarketModalProps = {
  open: boolean;
  onClose: () => void;
  tokenName: string;
};

export const StablecoinMarketModal: React.FC<StablecoinMarketModalProps> = (
  props
) => {
  const [balance, setBalance] = useState('0');
  const [result, setResult] = useState<BN>(new BN(0));
  const tokens = useStablecoinTokens();
  const { account } = useWeb3React<Web3>();
  const collateralMarketContract = useCollateralMarketContract();
  const network = useNetworkConfig();
  const getBalance = useBalance();
  const getContract = useDynamicContract<Ierc20>({
    abi: IERC20.abi as AbiItem[]
  });

  const [successOpen, successToggle] = useToggle(false);
  const [failureOpen, failureToggle] = useToggle(false);
  const [walletsOpen, walletsToggle] = useToggle(false);
  const [transactionOpen, transactionToggle] = useToggle(false);

  const { governanceInUSDC } = useGovernanceCost();

  const formik = useFormik({
    initialValues: {
      currency: 'USDC',
      amount: ''
    },

    validate: async (formValues) => {
      const error: Partial<typeof formValues> = {};

      if (!formValues.currency) {
        error.currency = 'Choose currency';
        return error;
      }

      if (Number(formValues.amount) <= 0) {
        error.amount = 'Amount of currency is required';
        return error;
      }

      const currentToken = network.assets[formValues.currency];

      if (!currentToken) return;

      const balanceOfToken = await getBalance({
        tokenAddress: currentToken.address,
        tokenName: currentToken.name
      });

      if (
        balanceOfToken
          .div(new BN(10).pow(currentToken.decimals))
          .isLessThan(formValues.amount)
      ) {
        error.amount = `Not enough ${formValues.currency}`;
      }

      return error;
    },

    onSubmit: async (formValues) => {
      const currentToken = network.assets[formValues.currency];

      if (!currentToken || !account) return;

      const currentContract = getContract(currentToken.address);

      const formInvest = new BN(formValues.amount)
        .multipliedBy(new BN(10).pow(currentToken.decimals))
        .toString(10);

      try {
        const buyStableToken = collateralMarketContract.methods.buy(
          currentContract.options.address,
          formInvest
        );

        const approve = currentContract.methods.approve(
          collateralMarketContract.options.address,
          formInvest
        );

        const allowance = await currentContract.methods
          .allowance(account, collateralMarketContract.options.address)
          .call();

        if (allowance !== '0') {
          const approveZero = currentContract.methods.approve(
            collateralMarketContract.options.address,
            '0'
          );

          await approveZero.send({
            from: account,
            gas: await approveZero.estimateGas({ from: account })
          });
        }

        await approve.send({
          from: account,
          gas: await approve.estimateGas({ from: account })
        });
        window.onbeforeunload = () => 'wait please transaction in progress';

        await buyStableToken.send({
          from: account,
          gas: await buyStableToken.estimateGas({ from: account })
        });

        failureToggle(false);
        successToggle(true);
      } catch {
        failureToggle(true);
      } finally {
        window.onbeforeunload = () => null;
        transactionToggle(false);
      }
    }
  });

  useDebounce(
    () => {
      if (!formik.values.amount) {
        setResult(new BN(0));
        return;
      }

      setResult(new BN(formik.values.amount));
    },
    100,
    [formik.values.amount, formik.values.currency, tokens]
  );

  useTimeoutInterval(async () => {
    const balanceOfToken = await getBalance({
      tokenAddress: network.assets.Stable.address,
      tokenName: network.assets.Stable.name
    });

    setBalance(
      balanceOfToken
        .div(new BN(10).pow(network.assets.Stable.decimals))
        .toString(10)
    );
  }, 1500);

  const handleSuccessClose = useCallback(() => {
    successToggle(false);
    formik.resetForm();
    setResult(new BN(0));
  }, [successToggle, formik]);

  const handleClose = useCallback(() => {
    props.onClose?.();
    formik.resetForm();
  }, [formik, props]);

  return (
    <>
      <FormikContext.Provider value={formik}>
        <FormModal
          onClose={handleClose}
          open={props.open}
          tokenName="USDp"
          tokens={tokens}
          balance={balance}
          tokenCost={governanceInUSDC}
          result={result.toString(10)}
          openWalletListModal={walletsToggle}
        />
      </FormikContext.Provider>
      <Modal open={successOpen} onClose={handleSuccessClose}>
        <SmallModal>
          <InfoCardSuccess
            tokenName="USDp"
            onClick={handleSuccessClose}
            purchased={result.toString(10)}
          />
        </SmallModal>
      </Modal>
      <Modal open={failureOpen} onClose={failureToggle}>
        <SmallModal>
          <InfoCardFailure onClick={formik.submitForm} />
        </SmallModal>
      </Modal>
      <Modal open={transactionOpen}>
        <SmallModal>
          <InfoCardLoader isAnimating={transactionOpen} />
        </SmallModal>
      </Modal>
      <WalletModal open={walletsOpen} onClose={walletsToggle} />
    </>
  );
};
