import React from 'react';
import clsx from 'clsx';

import { Plate, Typography, dateUtils } from 'src/common';
import { ReactComponent as TextRound } from 'src/assets/images/text-round.svg';
import { ReactComponent as AnnouncementTitleLine } from 'src/assets/images/announcement.svg';
import { config } from 'src/config';
import { useInvestingAnnouncementStyles } from './investing-announcement.styles';

export type InvestingAnnouncementProps = {
  className?: string;
};

export const InvestingAnnouncement: React.FC<InvestingAnnouncementProps> = (
  props
) => {
  const classes = useInvestingAnnouncementStyles();

  return (
    <Plate className={clsx(classes.announcement, props.className)}>
      <Typography variant="h2" align="center">
        The{' '}
        <Typography
          variant="inherit"
          component="span"
          className={classes.decoratedText}
        >
          <TextRound className={classes.textRound} />
          pre-sale
        </Typography>{' '}
        round of Appetite USD (USDp) starts{' '}
        <Typography
          variant="inherit"
          component="span"
          className={classes.decoratedText}
        >
          <AnnouncementTitleLine className={classes.tokenTitleLine} />
          {dateUtils.countdown(config.COUNTDOWN_DATE)}
        </Typography>
      </Typography>
    </Plate>
  );
};
