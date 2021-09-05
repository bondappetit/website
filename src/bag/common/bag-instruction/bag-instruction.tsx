import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Plate, Typography, Link } from 'src/common';
import { ReactComponent as management } from 'src/assets/images/pic1.svg';
import { ReactComponent as liquidity } from 'src/assets/images/pic2.svg';
import { ReactComponent as development } from 'src/assets/images/pic3.svg';
import { URLS } from 'src/router/urls';
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
        title="Governance"
        text={
          <>
            BAG is the only tool for instruction-making. BAG holders are
            entitled to influence the future of BondAppétit. In order to enforce
            certain actions, a simple majority of token holders must vote for a
            certain proposal.{' '}
            <Link
              color="blue"
              component={ReactRouterLink}
              to={URLS.voting.info}
            >
              Vote or iniate a proposal
            </Link>
          </>
        }
      />
      <div className={classes.instruction}>
        {GOVERNANCE.map((governanceItem) => {
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
