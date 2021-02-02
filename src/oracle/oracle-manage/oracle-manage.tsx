import React, { useCallback, useState } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import {
  Button,
  useSecurityOracleContract,
  useDepositaryOracleContract,
  Typography,
  PageWrapper,
  estimateGas,
  BN
} from 'src/common';
import { MainLayout } from 'src/layouts';
import {
  useRebalance,
  OracleSaveForm,
  OracleSaveFormValues,
  OracleGetForm,
  OracleGetFormValues
} from '../common';

enum TokenTypes {
  security = 'security',
  depositary = 'depositary'
}

type SavedToken = {
  isin: string;
  amount: string;
  tokenType: TokenTypes;
};

export const OracleManage: React.FC = () => {
  const depositaryOracleContract = useDepositaryOracleContract();
  const securityOracleContract = useSecurityOracleContract();
  const { account, library } = useWeb3React<Web3>();
  const [savedToken, setSavedToken] = useState<SavedToken | null>(null);

  const handleRebalance = useRebalance();

  const handleSaveDepositary = useCallback(
    async (formValues: OracleSaveFormValues) => {
      if (!account) return;

      const put = depositaryOracleContract.methods.put(
        formValues.isin,
        formValues.value
      );

      await put.send({
        from: account,
        gas: await estimateGas(put, { from: account })
      });
    },
    [depositaryOracleContract, account]
  );

  const handleSaveSecurity = useCallback(
    async (formValues: OracleSaveFormValues) => {
      if (!library || !account) return;

      const securityValue = new BN(formValues.value)
        .multipliedBy(new BN(10).pow(6))
        .toString(10);
      const put = securityOracleContract.methods.put(
        formValues.isin,
        formValues.property,
        library.eth.abi.encodeParameters([formValues.type], [securityValue])
      );

      await put.send({
        from: account,
        gas: await estimateGas(put, { from: account })
      });
    },
    [securityOracleContract, library, account]
  );

  const handleGetDepositary = useCallback(
    async (formValues: OracleGetFormValues) => {
      if (!account || !depositaryOracleContract) return;

      const result = await depositaryOracleContract.methods
        .get(formValues.isin)
        .call();

      if (!result) return;

      const [isin, amount] = result;

      setSavedToken({
        isin,
        amount,
        tokenType: TokenTypes.depositary
      });
    },
    [depositaryOracleContract, account]
  );

  const handleGetSecurity = useCallback(
    async (formValues: OracleGetFormValues) => {
      if (!library || !account || !securityOracleContract) return;

      const result = await securityOracleContract.methods
        .get(formValues.isin, 'nominalValue')
        .call();
      if (!result) return;

      const decodedAmount = library.eth.abi.decodeParameters(
        [formValues.type],
        result
      );

      const amount = new BN(decodedAmount[0])
        .div(new BN(10).pow(6))
        .toString(10);

      setSavedToken({
        isin: formValues.isin,
        amount,
        tokenType: TokenTypes.security
      });
    },
    [securityOracleContract, library, account]
  );

  return (
    <MainLayout>
      <PageWrapper>
        <Button onClick={handleRebalance}>Rebalance</Button>
        <div>
          <Typography variant="h3">Depositary save</Typography>
          <OracleSaveForm onSubmit={handleSaveDepositary} />
        </div>
        <div>
          <Typography variant="h3">Security save</Typography>
          <OracleSaveForm onSubmit={handleSaveSecurity} withSelect />
        </div>
        <div>
          <Typography variant="h3">Depositary get</Typography>
          <OracleGetForm onSubmit={handleGetDepositary} />
          {savedToken?.tokenType === TokenTypes.depositary && (
            <>
              <Typography variant="body1">Key: {savedToken.isin}</Typography>
              <Typography variant="body1">
                Amount: {savedToken.amount}
              </Typography>
            </>
          )}
        </div>
        <div>
          <Typography variant="h3">Security get</Typography>
          <OracleGetForm onSubmit={handleGetSecurity} withSelect />
          {savedToken?.tokenType === TokenTypes.security && (
            <>
              <Typography variant="body1">Key: {savedToken.isin}</Typography>
              <Typography variant="body1">
                Amount: {savedToken.amount}
              </Typography>
            </>
          )}
        </div>
      </PageWrapper>
    </MainLayout>
  );
};
