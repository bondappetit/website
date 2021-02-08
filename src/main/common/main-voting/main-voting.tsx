import clsx from 'clsx';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Typography, Link, Typewriter } from 'src/common';
import { URLS } from 'src/router/urls';
import { useMainVotingStyles } from './main-voting.styles';

export type MainVotingProps = {
  className?: string;
};

export const MainVoting: React.FC<MainVotingProps> = (props) => {
  const classes = useMainVotingStyles();

  return (
    <div className={clsx(props.className)}>
      <Typography variant="h4" align="center" className={classes.title}>
        Shape the future of BondAppétite using the main tool for decision-making
        in the protocol — BondAppétit Governance. In order to enforce certain
        actions, a simple majority of tokenholders must vote for a certain
        proposal.
      </Typography>
      <div className={classes.content}>
        <Typography variant="h2" component="p" className={classes.text}>
          <Typewriter>Add new markets for the automatic exchange</Typewriter>
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
