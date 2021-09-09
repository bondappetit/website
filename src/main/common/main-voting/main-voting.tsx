import clsx from 'clsx';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Typography, Link } from 'src/common';
import { URLS } from 'src/router/urls';
import { VOTING_TEXT } from '../constants';
import { MainVotingTypewriter } from './main-voting-typewriter';
import { useMainVotingStyles } from './main-voting.styles';

export type MainVotingProps = {
  className?: string;
};

export const MainVoting: React.FC<MainVotingProps> = (props) => {
  const classes = useMainVotingStyles();

  return (
    <div className={clsx(props.className)}>
      <Typography variant="h4" align="center" className={classes.title}>
        Shape the future of BondAppetit using the main tool for decision-making
        in the protocol — BondAppetit Governance. In order to enforce certain
        actions, a simple majority of tokenholders must vote for a certain
        proposal.
      </Typography>
      <div className={classes.content}>
        <Typography variant="h2" component="p" className={classes.text}>
          <MainVotingTypewriter>{VOTING_TEXT}</MainVotingTypewriter>
        </Typography>
        <div className={classes.tickets}>
          <div className={clsx(classes.ticket, classes.against)}>
            Vote Against
          </div>
          <div className={clsx(classes.ticket, classes.for)}>Vote For</div>
        </div>
      </div>
      <Typography variant="h4" align="center">
        <Link component={ReactRouterLink} to={URLS.voting.info} color="blue">
          Explore Governance →
        </Link>
      </Typography>
    </div>
  );
};
