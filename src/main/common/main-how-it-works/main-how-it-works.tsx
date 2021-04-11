import React from 'react';
import { useToggle } from 'react-use';
import clsx from 'clsx';
import VideoBackground from 'src/assets/images/video.png';

import { ButtonBase, Typography } from 'src/common';
import { ReactComponent as PlayIcon } from 'src/assets/icons/play.svg';
import { useMainHowItWorksStyles } from './main-how-it-works.styles';

const VIDEO_UD = '5w32WATvDpc';

export const MainHowItWorks: React.FC = () => {
  const classes = useMainHowItWorksStyles();

  const [play, togglePlay] = useToggle(false);

  return (
    <div className={classes.root}>
      {!play && (
        <div
          onClick={togglePlay}
          onKeyDown={togglePlay}
          role="button"
          tabIndex={0}
          className={classes.buttonWrap}
        >
          <ButtonBase className={classes.button}>
            <PlayIcon className={classes.buttonPlayIcon} />
            <Typography variant="h4" component="span">
              See how it works
            </Typography>
          </ButtonBase>
          <img
            className={clsx(classes.video, classes.cover)}
            src={VideoBackground}
            alt=""
          />
        </div>
      )}
      {play && (
        <iframe
          className={classes.video}
          scrolling="no"
          title="This is a unique title"
          src={`https://www.youtube.com/embed/${VIDEO_UD}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};
