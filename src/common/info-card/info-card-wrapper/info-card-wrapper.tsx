import React from 'react';

import { Button } from 'src/common/button';
import { Typography } from 'src/common/typography';
import { useInfoCardWrapperStyles } from './info-card-wrapper.styles';

export type InfoCardWrapperProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  button?: React.ReactNode;
  onClick?: () => void;
  success?: boolean;
};

export const InfoCardWrapper: React.FC<InfoCardWrapperProps> = (props) => {
  const classes = useInfoCardWrapperStyles();

  return (
    <div className={classes.wrap}>
      <div className={classes.title}>
        <Typography variant="h2" align="center" className={classes.typography}>
          <Typography
            variant="inherit"
            component="span"
            className={classes.decoratedText}
          >
            {props.title}
          </Typography>
        </Typography>
        <Typography variant="h2" align="center" className={classes.typography}>
          {props.subtitle}
        </Typography>
      </div>
      <Button color="primary" onClick={props.onClick}>
        {props.button}
      </Button>
    </div>
  );
};
