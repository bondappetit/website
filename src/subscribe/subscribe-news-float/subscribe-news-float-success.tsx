import React from 'react';

import { Button, Typography } from 'src/common';
import { useSubscribeNewsFloatStyles } from './subscribe-news-float.styles';

export const SubscribeNewsFloatSuccess: React.FC<{ onClose: () => void }> = (
  props
) => {
  const classes = useSubscribeNewsFloatStyles();

  return (
    <div className={classes.form}>
      <Typography variant="h5" className={classes.successTitle} component="div">
        <Typography variant="inherit" component="div" weight="bold">
          Thanks for subscription!
        </Typography>
        We will share with you the hotest news and latest updates of
        BondAppétit.
      </Typography>
      <Button className={classes.button} type="button" onClick={props.onClose}>
        Got It
      </Button>
    </div>
  );
};
