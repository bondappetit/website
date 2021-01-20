import clsx from 'clsx';
import React from 'react';

import { useVotingChartStyles } from './voting-chart.styles';

export type VotingChartProps = {
  className?: string;
};

export const VotingChart: React.FC<VotingChartProps> = (props) => {
  const classes = useVotingChartStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <div className={classes.fillSegment} />
      <div className={clsx(classes.segment, classes.segment20)} />
      <div className={clsx(classes.segment, classes.segment14)} />
      <div className={clsx(classes.segment, classes.segment12)} />
      <div className={clsx(classes.segment, classes.segment2)} />
      <div className={clsx(classes.segment, classes.segment1)} />
    </div>
  );
};
