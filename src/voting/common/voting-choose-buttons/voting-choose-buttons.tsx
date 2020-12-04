import React from 'react';

import { ButtonBase, Typography } from 'src/common';
import { useVotingChooseButtonsStyles } from './voting-choose-buttons.styles';

type ButtonProps = {
  title: string;
  subtitle: string;
  onClick: () => void;
};

export type VotingChooseButtonsProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  buttons?: ButtonProps[];
};

export const VotingChooseButtons: React.FC<VotingChooseButtonsProps> = (
  props
) => {
  const classes = useVotingChooseButtonsStyles();

  return (
    <>
      <Typography variant="h5" align="center" weight="bold">
        {props.title}
      </Typography>
      <Typography variant="body1" align="center" className={classes.subtitle}>
        {props.subtitle}
      </Typography>
      {props.buttons?.map(({ onClick, title, subtitle }) => (
        <ButtonBase
          onClick={onClick}
          key={title}
          type="button"
          className={classes.button}
        >
          <Typography variant="h4" component="span">
            {title}
          </Typography>
          <Typography variant="body2" component="span">
            {subtitle}
          </Typography>
        </ButtonBase>
      ))}
    </>
  );
};
