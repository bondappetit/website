import React from 'react';

import { Plate, Typography } from 'src/common';
import { ReactComponent as management } from 'src/assets/images/pic1.svg';
import { ReactComponent as liquidity } from 'src/assets/images/pic2.svg';
import { ReactComponent as development } from 'src/assets/images/pic3.svg';
import { useVotingInfoDecisionStyles } from './voting-info-decision.styles';
import { DECISION_MAKING } from '../constants';

const ICONS = new Map([
  [DECISION_MAKING[0].title, management],
  [DECISION_MAKING[1].title, liquidity],
  [DECISION_MAKING[2].title, development]
]);

export type BagInstructionProps = {
  className?: string;
};

export const VotingInfoDecision: React.FC<BagInstructionProps> = (props) => {
  const classes = useVotingInfoDecisionStyles();

  return (
    <div className={props.className}>
      <Typography variant="h2" className={classes.title}>
        Governance mechanics
      </Typography>
      <div className={classes.instruction}>
        {DECISION_MAKING.map((governanceItem) => {
          const Icon = ICONS.get(governanceItem.title);

          return (
            <Plate
              withoutBorder
              color="grey"
              key={governanceItem.title}
              className={classes.instructionCard}
            >
              {Icon && <Icon className={classes.icon} />}
              <Typography
                variant="h5"
                weight="semibold"
                className={classes.instructionCardTitle}
              >
                {governanceItem.title}
              </Typography>
              <ul className={classes.instructionCardList}>
                {governanceItem.text.map((text) => (
                  <li key={text} className={classes.instructionCardListItem}>
                    <Typography
                      variant="h5"
                      className={classes.instructionCardListText}
                    >
                      {text}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Plate>
          );
        })}
      </div>
    </div>
  );
};
