import React from 'react';
import clsx from 'clsx';

import { Typography, dateUtils, Button, useTimeoutInterval } from 'src/common';
import { config } from 'src/config';
import { useInvestingAnnouncementStyles } from './investing-announcement.styles';

export type InvestingAnnouncementProps = {
  className?: string;
  onClick?: () => void;
};

export const InvestingAnnouncement: React.FC<InvestingAnnouncementProps> = (
  props
) => {
  const [countdown, setCountdown] = React.useState(
    dateUtils.countdown(config.COUNTDOWN_DATE)
  );
  const classes = useInvestingAnnouncementStyles();

  useTimeoutInterval(() => {
    setCountdown(dateUtils.countdown(config.COUNTDOWN_DATE));
  }, 1000);

  return (
    <div className={clsx(classes.announcement, props.className)}>
      <Typography variant="h4" align="center" className={classes.title}>
        The protocol starts in {countdown}
      </Typography>
      <Button onClick={props.onClick}>Notify me</Button>
    </div>
  );
};
