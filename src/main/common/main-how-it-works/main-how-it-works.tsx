import React from 'react';
import { useToggle } from 'react-use';

import { ButtonBase, Typography } from 'src/common';
import { ReactComponent as PlayIcon } from 'src/assets/icons/play.svg';
import { useMainHowItWorksStyles } from './main-how-it-works.styles';

const VIDEO_UD = 'r43LhSUUGTQ';

export const MainHowItWorks: React.FC = () => {
  const classes = useMainHowItWorksStyles();

  const [play, togglePlay] = useToggle(false);

  return (
    <div className={classes.root}>
      {!play && (
        <>
          <ButtonBase onClick={togglePlay} className={classes.button}>
            <PlayIcon className={classes.buttonPlayIcon} />
            <Typography variant="h4" component="span">
              See how it works
            </Typography>
          </ButtonBase>
          <img
            className={classes.video}
            src={`https://i.ytimg.com/vi/${VIDEO_UD}/maxresdefault.jpg`}
            alt=""
          />
        </>
      )}
      {play && (
        <iframe
          className={classes.video}
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
