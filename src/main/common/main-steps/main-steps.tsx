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
      <Typography variant="h2" className={classes.title}>
        Skyrocket BondAppétit, become a part of potocol on early stages
      </Typography>
      <div className={classes.content}>
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
              <Typography variant="h5" weight="semibold">
                {step.title}
              </Typography>
              <Typography
                variant="h5"
                component="p"
                className={classes.cardBody}
              >
                {step.body}
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
    </div>
  );
};
