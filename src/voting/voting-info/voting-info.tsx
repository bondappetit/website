import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { Link as ReactRouterLink, useHistory } from 'react-router-dom';

import {
  BN,
  ButtonBase,
  Faq,
  Head,
  humanizeNumeral,
  Link,
  PageWrapper,
  Typography,
  useModal
} from 'src/common';
import { MainLayout } from 'src/layouts';
import { URLS } from 'src/router/urls';
import {
  useVotingProposalList,
  VotingInfoProposalList,
  VotingInfoDecision,
  FAQ,
  useVoteInfo,
  VotingCreateProposalModal
} from '../common';
import { VotingChoose } from '../voting-choose';
import { useVotingInfoStyles } from './voting-info.styles';

const DELEGATE_TO_DEFAULT = '0x0000000000000000000000000000000000000000';

const getButtonText = (delegateTo?: string, currentVotes?: string) => {
  let delegateButtonText = '';
  if (new BN(currentVotes || 0).isGreaterThan(0)) {
    if (delegateTo === DELEGATE_TO_DEFAULT) {
      delegateButtonText = 'Delegate';
    } else {
      delegateButtonText = 'Redelegate';
    }
  } else {
    delegateButtonText = 'Unlock';
  }

  return delegateButtonText;
};

export const VotingInfo: React.VFC<unknown> = () => {
  const classes = useVotingInfoStyles();

  const history = useHistory();
  const [openCreateProposal] = useModal(VotingCreateProposalModal);

  const { proposals, pages } = useVotingProposalList(3);
  const {
    currentVotes,
    canCreateProposal,
    handleUpdateVoteInfo,
    delegateTo,
    currentGovCoin
  } = useVoteInfo();

  const proposalCount = useMemo(() => pages.flat().length, [pages]);

  const [votingChooseOpen, setVotingChooseOpen] = useState(false);

  const handleToggleVotingChoose = () => {
    setVotingChooseOpen(!votingChooseOpen);
    handleUpdateVoteInfo();
  };

  const handleCreateProposal = () => {
    if (!canCreateProposal) {
      openCreateProposal().catch(console.error);
      return;
    }

    history.push(URLS.voting.create);
  };

  return (
    <>
      <Head title="Shape the future of the protocol with the BondAppetit Governance token (BAG)" />
      <MainLayout>
        <PageWrapper className={classes.root}>
          <div className={clsx(classes.block, classes.titleWrap)}>
            <Typography variant="h1" className={classes.title}>
              Shape the future of the protocol
            </Typography>
            <Typography variant="h5" className={classes.subtitle}>
              BondAppetit is governed by its community. All token holders can
              participate in governing the&nbsp;protocol. Any member of the
              community with more than 1,000,000 BAG tokens can create a
              proposal.{' '}
              <Link
                component={ReactRouterLink}
                to={`${URLS.whitepaper}#19`}
                color="blue"
              >
                Learn more
              </Link>
            </Typography>
          </div>
          <VotingInfoProposalList
            actions={
              <Typography variant="h5" className={classes.actions}>
                <Typography variant="inherit">
                  {!proposals.loading &&
                    (new BN(currentVotes).isGreaterThan(0) ||
                      new BN(currentGovCoin).isGreaterThan(0)) && (
                      <>
                        Your votes:{' '}
                        <Typography variant="inherit" weight="semibold">
                          {new BN(currentVotes).isEqualTo(0)
                            ? currentGovCoin
                            : currentVotes}{' '}
                          {new BN(currentVotes).isGreaterThan(0) &&
                            new BN(currentGovCoin).isGreaterThan(
                              currentVotes
                            ) && <> {humanizeNumeral(currentGovCoin)}</>}
                        </Typography>
                        {new BN(currentVotes).isZero() && '(locked)'}
                      </>
                    )}
                  {!proposals.loading &&
                    new BN(currentVotes).isEqualTo(0) &&
                    new BN(currentGovCoin).isEqualTo(0) && <>No Votes</>}
                </Typography>
                <ButtonBase
                  className={classes.actionsButton}
                  onClick={handleToggleVotingChoose}
                >
                  {getButtonText(delegateTo, currentVotes)}
                </ButtonBase>
                <ButtonBase
                  className={classes.actionsButton}
                  onClick={handleCreateProposal}
                >
                  + Create New Proposal
                </ButtonBase>
              </Typography>
            }
            loading={proposals.loading}
            proposals={proposals.value}
            proposalCount={proposalCount}
            className={clsx(classes.block)}
          />
          <VotingInfoDecision className={clsx(classes.block)} />
          <Faq title="Learn more about BAG" className={clsx(classes.block)}>
            {FAQ}
          </Faq>
        </PageWrapper>
      </MainLayout>
      <VotingChoose
        votes={currentGovCoin}
        open={votingChooseOpen}
        onClose={handleToggleVotingChoose}
      />
    </>
  );
};
