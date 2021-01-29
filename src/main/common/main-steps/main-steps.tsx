import clsx from 'clsx';
import React from 'react';

import { Status, Typography } from 'src/common';
import { useMainStepsStyles } from './main-steps.styles';
import { STEPS } from '../constants';

export type MainStepsProps = {
  className?: string;
};

export const MainSteps: React.FC<MainStepsProps> = (props) => {
  const classes = useMainStepsStyles();

  return (
    <div className={clsx(props.className)}>
      <Typography variant="h4" align="center" className={classes.title}>
        Skyrocket the future of BondAppétit. Become a part of potocol on early
        stages, earn more governance token, influence the future.
      </Typography>
      <div className={classes.segment} />
      <div className={classes.list}>
        {STEPS.map((step, index) => (
          <div key={step.title} className={classes.card}>
            <Typography variant="h5">
              Phase {index + 1}{' '}
              {step.active && (
                <Status color="superGreen" variant="contained">
                  Active
                </Status>
              )}
            </Typography>
            <Typography variant="h5" weight="bold">
              {step.title}
            </Typography>
            <Typography variant="h5" component="p" className={classes.cardBody}>
              {step.body}
            </Typography>
            <div className={classes.cardDate}>
              <Typography variant="h5" component="div">
                Start: {step.startDate}
                <span className={classes.dateComma}>,</span>
                <br /> Duration: {step.duration}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
