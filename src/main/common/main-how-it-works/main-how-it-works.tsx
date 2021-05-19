import React from 'react';

import { useMainHowItWorksStyles } from './main-how-it-works.styles';

const VIDEO_UD = '5w32WATvDpc';

export const MainHowItWorks: React.FC = () => {
  const classes = useMainHowItWorksStyles();

  return (
    <div className={classes.root}>
      <iframe
        className={classes.video}
        scrolling="no"
        title="This is a unique title"
        src={`https://www.youtube.com/embed/${VIDEO_UD}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
