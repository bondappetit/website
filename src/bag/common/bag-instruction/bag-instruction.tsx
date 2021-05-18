import React from 'react';

import { Plate, Typography } from 'src/common';
import { ReactComponent as management } from 'src/assets/images/pic1.svg';
import { ReactComponent as liquidity } from 'src/assets/images/pic2.svg';
import { ReactComponent as development } from 'src/assets/images/pic3.svg';
import { BagTitle } from '../bag-title';
import { useBagInstructionStyles } from './bag-instruction.styles';
import { GOVERNANCE } from '../constants';

const ICONS = new Map([
  [GOVERNANCE[0].title, management],
  [GOVERNANCE[1].title, liquidity],
  [GOVERNANCE[2].title, development]
]);

export type BagInstructionProps = {
  className?: string;
};

export const BagInstruction: React.FC<BagInstructionProps> = (props) => {
  const classes = useBagInstructionStyles();

  return (
    <div className={props.className} id="governance">
      <BagTitle
        bold="Governance"
        text={
          <>
            BAG is the only tool for decision-making. BAG holders are entitled
            to influence the future of BondAppétite. In order to enforce certain
            actions, a simple majority of token holders must vote for a certain
            proposal.
          </>
        }
      />
      <Plate withoutBorder color="grey" className={classes.decision}>
        {GOVERNANCE.map((governanceItem) => {
          const Icon = ICONS.get(governanceItem.title);

          return (
            <div key={governanceItem.title} className={classes.decisionCard}>
              {Icon && <Icon className={classes.icon} />}
              <Typography
                variant="h3"
                weight="light"
                className={classes.decisionCardTitle}
              >
                {governanceItem.title}
              </Typography>
              <ul className={classes.decisionCardList}>
                {governanceItem.text.map((text) => (
                  <li key={text} className={classes.decisionCardListItem}>
                    <Typography variant="body1">{text}</Typography>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </Plate>
    </div>
  );
};
