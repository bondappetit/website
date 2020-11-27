import React, { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import BN from 'bignumber.js';

import {
  Button,
  useSecurityOracleContract,
  useDepositaryOracleContract,
  Typography
} from 'src/common';
import { MainLayout } from 'src/layouts';
import { useRebalance, OracleForm, OracleFormValues } from '../common';
import { useOracleManageStyles } from './oracle-manage.styles';

export type OracleManageProps = unknown;

export const OracleManage: React.FC<OracleManageProps> = () => {
  const classes = useOracleManageStyles();
  const depositaryOracleContract = useDepositaryOracleContract();
  const securityOracleContract = useSecurityOracleContract();
  const { account, library } = useWeb3React<Web3>();

  const handleRebalance = useRebalance();

  const handleSaveDepositary = useCallback(
    async (formValues: OracleFormValues) => {
      if (!account) return;

      await depositaryOracleContract?.methods
        .put(formValues.isin, formValues.value)
        .send({
          from: account,
          gas: 2000000
        });
    },
    [depositaryOracleContract, account]
  );
  const handleSaveSecurity = useCallback(
    async (formValues: OracleFormValues) => {
      if (!library || !account) return;

      const securityValue = new BN(formValues.value)
        .multipliedBy(new BN(10).pow(6))
        .toString(10);

      await securityOracleContract?.methods
        .put(
          formValues.isin,
          'nominalValue',
          library.eth.abi.encodeParameters(['uint256'], [securityValue])
        )
        .send({
          from: account,
          gas: 2000000
        });
    },
    [securityOracleContract, library, account]
  );

  return (
    <MainLayout>
      <div className={classes.oracle}>
        <Button onClick={handleRebalance}>Rebalance</Button>
        <div>
          <Typography variant="h3">Depositary</Typography>
          <OracleForm onSubmit={handleSaveDepositary} />
        </div>
        <div>
          <Typography variant="h3">Security</Typography>
          <OracleForm onSubmit={handleSaveSecurity} />
        </div>
      </div>
    </MainLayout>
  );
};
