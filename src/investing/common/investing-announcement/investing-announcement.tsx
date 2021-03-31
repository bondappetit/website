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
  const classes = useInvestingAnnouncementStyles();

  return (
    <div className={clsx(classes.announcement, props.className)}>
      <Button onClick={props.onClick}>Notify me as protocol starts</Button>
    </div>
  );
};
