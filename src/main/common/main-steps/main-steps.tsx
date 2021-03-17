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
        Skyrocket the future of BondAppétit. Become part of the protocol in the
        early stages, earn more governance tokens, and shape the future of
        BondAppétit
      </Typography>
      <div className={classes.segment} />
      <div className={classes.list}>
        {STEPS.map((step, index) => (
          <div
            key={step.title}
            className={clsx(classes.card, {
              [classes.cardActive]: step.active
            })}
          >
            <Typography variant="h5">
              Phase {index + 1}{' '}
              {step.active && (
                <Status
                  color="black"
                  variant="contained"
                  className={classes.status}
                >
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
            <Typography
              variant="body1"
              component="div"
              className={classes.cardDate}
            >
              Start: {step.startDate}
              <br /> Duration: {step.duration}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              className={classes.mobileCardDate}
            >
              {step.mobileDate}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
