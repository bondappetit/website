import React from 'react';

import { useMainHowItWorksStyles } from './main-how-it-works.styles';

export const MainHowItWorks: React.FC = () => {
  const classes = useMainHowItWorksStyles();

  return (
    <div className={classes.root}>
      <iframe
        className={classes.video}
        title="This is a unique title"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/r43LhSUUGTQ"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
