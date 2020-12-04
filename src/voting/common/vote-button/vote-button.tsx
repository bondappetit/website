import clsx from 'clsx';
import React from 'react';

import { ButtonBase, Typography } from 'src/common';
import { useVoteButtonStyles } from './vote-button.styles';

export type VoteButtonProps = {
  variant: 'voteFor' | 'voteAgainst';
  onClick?: () => void;
};

export const VoteButton: React.FC<VoteButtonProps> = (props) => {
  const classes = useVoteButtonStyles();

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
