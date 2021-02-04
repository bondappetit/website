import React from 'react';

import { Plate, Typography } from 'src/common';
import { FACTOID } from '../constants';
import { VotingChart } from '../voting-chart';
import { useVotingInfoFactoidStyles } from './voting-info-factoid.styles';

export type VotingInfoFactoidProps = {
  className?: string;
};

export const VotingInfoFactoid: React.FC<VotingInfoFactoidProps> = (props) => {
  const classes = useVotingInfoFactoidStyles();

  return (
    <div className={props.className}>
      <Typography
        variant="h4"
        component="p"
        align="center"
        className={classes.title}
      >
        <Typography variant="inherit" weight="bold">
          BondAppétit Governance (BAG)
        </Typography>{' '}
        — The main tool for decision-making in the protocol, as well as the main
        reward and incentive tool for participants of the protocol and the
        community.
      </Typography>
      <Plate color="grey" withoutBorder className={classes.plate}>
        <VotingChart className={classes.chart} />
        <div className={classes.factoidText}>
          <Typography variant="h2">
            65% of all 100,000,000 BAG reserved for protocol usage and future
            governance participation incentives.
          </Typography>
          <ul className={classes.factoid}>
            {FACTOID.map((fact) => (
              <li className={classes.factoidItem} key={fact.text}>
                <Typography
                  variant="body1"
                  className={classes.factoidItemContent}
                >
                  <Typography variant="inherit" weight="bold">
                    {fact.percent}
                  </Typography>{' '}
                  <Typography variant="inherit">{fact.text}</Typography>
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      </Plate>
      <Typography
        variant="h4"
        component="p"
        align="center"
        className={classes.title}
      >
        To ensure the inexhaustibly of BAG — the protocol contains the ability
        to issue new tokens each block. The decision regarding the new issuance
        is taken is by voting of tokenholders.
      </Typography>
    </div>
  );
};
