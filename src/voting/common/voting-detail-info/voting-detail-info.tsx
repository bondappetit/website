import clsx from 'clsx';
import React from 'react';

import { ReactComponent as CheckedIcon } from 'src/assets/icons/checked.svg';
import { Typography } from 'src/common';
import { useVotingDetailInfoStyles } from './voting-detail-info.styles';

export type VotingDetailInfoProps = {
  variant: 'voteFor' | 'voteAgainst';
  active?: boolean;
  onAddresses?: () => void;
  count?: number;
  total?: number;
};

export const VotingDetailInfo: React.FC<VotingDetailInfoProps> = (props) => {
  const percentage = ((props.count ?? 0) / (props.total ?? 0)) * 100;
  const classes = useVotingDetailInfoStyles({ percentage });

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: props.active
      })}
    >
      {props.active && (
        <Typography variant="body1" component="div" className={classes.chip}>
          <CheckedIcon className={classes.checkedIcon} />
          voted
        </Typography>
      )}
      <Typography variant="h3" component="div">
        {percentage}% {props.children}
      </Typography>
      <div className={clsx(classes.separator, classes[props.variant])} />
      <Typography variant="body1" component="div">
        {props.count} votes
      </Typography>
    </div>
  );
};
