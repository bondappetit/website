import clsx from 'clsx';
import React from 'react';

import { ButtonBase, Typography } from 'src/common';
import { useVotingButtonStyles } from './voting-button.styles';

export type VotingButtonProps = {
  variant: 'voteFor' | 'voteAgainst';
  onClick?: () => void;
};

export const VotingButton: React.FC<VotingButtonProps> = (props) => {
  const classes = useVotingButtonStyles();

  return (
    <ButtonBase
      onClick={props.onClick}
      className={clsx(classes.root, classes[props.variant])}
    >
      <Typography variant="h4" component="span">
        {props.children}
      </Typography>
    </ButtonBase>
  );
};
