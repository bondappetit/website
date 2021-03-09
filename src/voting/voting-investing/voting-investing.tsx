import React, { useCallback, useMemo } from 'react';
import { useAsyncRetry, useToggle } from 'react-use';

import {
  BN,
  Button,
  LinkModal,
  Skeleton,
  Typography,
  useGovernanceContract,
  useInvestmentContract,
  useNetworkConfig
} from 'src/common';
import { VotingInvestingForm } from '../voting-investing-form';
import { useVotingInvestingStyles } from './voting-investing.styles';

export type VotingInvestingProps = unknown;

const TOTAL_TOKENS = 10000000;

export const VotingInvesting: React.VFC<VotingInvestingProps> = () => {
  const investmentContract = useInvestmentContract();
  const networkConfig = useNetworkConfig();
  const governanceContract = useGovernanceContract();
  const [linkModalIsOpen, toggleLinkModal] = useToggle(false);
  const [investFormIsOpen, toggleInvestForm] = useToggle(false);

  const classes = useVotingInvestingStyles();

  const state = useAsyncRetry(async () => {
    if (!governanceContract || !investmentContract) return;

    const balanceOfGovernance = await governanceContract.methods
      .balanceOf(investmentContract.options.address)
      .call();

    return new BN(balanceOfGovernance).div(
      new BN(10).pow(networkConfig.assets.Governance.decimals)
    );
  }, [networkConfig.assets]);

  const totalWithPercent = useMemo(() => {
    const totalTokens = new BN(TOTAL_TOKENS);

    return {
      totalTokens,
      percent: state.value?.div(totalTokens).multipliedBy(100)
    };
  }, [state.value]);

  const handleOpenBuyModal = useCallback(() => {
    toggleLinkModal(false);
    toggleInvestForm(true);
  }, [toggleLinkModal, toggleInvestForm]);

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h2">
          {state.loading ? (
            <Skeleton />
          ) : (
            <>{state.value?.toFormat(0)} BAG Remaining</>
          )}
          <br />
          of{' '}
          {state.loading ? (
            <Skeleton />
          ) : (
            totalWithPercent.totalTokens.toFormat(0)
          )}{' '}
          total distributed
        </Typography>
        <div>
          <progress
            className={classes.progress}
            max="100"
            value={totalWithPercent.percent?.toString(10)}
          />
        </div>
        <Button onClick={toggleLinkModal}>Buy</Button>
      </div>
      <VotingInvestingForm open={investFormIsOpen} onClose={toggleInvestForm} />
      <LinkModal
        withBuyCollateralMarket
        onBuyCollateralMarket={handleOpenBuyModal}
        open={linkModalIsOpen}
        onClose={toggleLinkModal}
        tokenAddress=""
      />
    </>
  );
};
