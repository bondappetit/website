import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Button, Plate, Typography } from 'src/common';
import { URLS } from 'src/router/urls';
import { useVotingInfoHowToStyles } from './voting-info-how-to.styles';

export type VotingInfoHowToProps = {
  className?: string;
};

export const VotingInfoHowTo: React.FC<VotingInfoHowToProps> = (props) => {
  const classes = useVotingInfoHowToStyles();

  return (
    <div className={props.className}>
      <Typography
        variant="h1"
        component="h2"
        align="center"
        className={classes.title}
      >
        How to get governance token?
      </Typography>
      <div className={classes.howToGetList}>
        <Plate className={classes.howToGetCard}>
          <Typography
            variant="h4"
            align="center"
            component="p"
            className={classes.howToGetCardText}
          >
            You can buy bond appetit governance token on exchange
          </Typography>
          <Button>Buy</Button>
        </Plate>
        <Plate className={classes.howToGetCard}>
          <Typography
            variant="h4"
            align="center"
            component="p"
            className={classes.howToGetCardText}
          >
            You can earn governance token as reward for supporting protocol
            activities in the staking section
          </Typography>
          <Button component={ReactRouterLink} to={URLS.staking.list}>
            Earn
          </Button>
        </Plate>
      </div>
    </div>
  );
};
