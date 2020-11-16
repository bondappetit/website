import React from 'react';
import clsx from 'clsx';

import { Plate, Typography } from 'src/common';
import { ReactComponent as TextRound } from 'src/assets/images/text-round.svg';
import { ReactComponent as AnnouncementTitleLine } from 'src/assets/images/announcement.svg';
import { useAnnouncementStyles } from './announcement.styles';

export type AnnouncementProps = {
  className?: string;
};

export const Announcement: React.FC<AnnouncementProps> = (props) => {
  const classes = useAnnouncementStyles();

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
        round of Appetit Reward Token (ART) starts{' '}
        <Typography
          variant="inherit"
          component="span"
          className={classes.decoratedText}
        >
          <AnnouncementTitleLine className={classes.tokenTitleLine} />
          in 3 weeks
        </Typography>
      </Typography>
    </Plate>
  );
};