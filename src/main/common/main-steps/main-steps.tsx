import clsx from 'clsx';
import React from 'react';

import { PieIcon, Status, Typography } from 'src/common';
import { ReactComponent as PhaseDoneIcon } from 'src/assets/icons/phase-done.svg';
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
        Become an early backer and help skyrocket the protocol
      </Typography>
      <div className={classes.content}>
        <div className={classes.segment} />
        <div className={classes.list}>
          {STEPS.map((step, index) => {
            const active = ['active', 'done'].includes(step.status);

            return (
              <div key={step.title} className={classes.card}>
                <span
                  className={clsx(classes.mark, {
                    [classes.markActive]: active
                  })}
                >
                  {step.status === 'done' && <PhaseDoneIcon />}
                  {step.status === 'active' && (
                    <PieIcon width="32" height="32" className={classes.pie}>
                      {step.progress}
                    </PieIcon>
                  )}
                </span>
                <Typography variant="h5">
                  Phase {index + 1}{' '}
                  {active && (
                    <Status
                      color="black"
                      variant="contained"
                      className={classes.status}
                    >
                      {step.status}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};
