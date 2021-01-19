import React from 'react';

import { Plate, Typography } from 'src/common';
import { DECISION_MAKING } from '../constants';
import { useVotingInfoDecisionStyles } from './voting-info-decision.styles';

export type VotingInfoDecisionProps = {
  className?: string;
};

export const VotingInfoDecision: React.FC<VotingInfoDecisionProps> = (
  props
) => {
  const classes = useVotingInfoDecisionStyles();

  return (
    <div className={props.className}>
      <Typography
        variant="h1"
        component="h2"
        align="center"
        className={classes.title}
      >
        Decision-Making
      </Typography>
      <div className={classes.decision}>
        {DECISION_MAKING.map((decisionItem) => (
          <Plate
            key={decisionItem.title}
            className={classes.decisionCard}
            variant="solid"
          >
            <Typography
              variant="h4"
              weight="bold"
              className={classes.decisionCardTitle}
            >
              {decisionItem.title}
            </Typography>
            {decisionItem.text.map((text) => (
              <Typography key={text} variant="body1">
                {text}
              </Typography>
            ))}
          </Plate>
        ))}
      </div>
    </div>
  );
};
