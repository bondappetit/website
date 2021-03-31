import React from 'react';

import { Button, Typography } from 'src/common';
import { useContactsNewsFloatStyles } from './contacts-news-float.styles';

export const ContactsNewsFloatSuccess: React.FC<{ onClose: () => void }> = (
  props
) => {
  const classes = useContactsNewsFloatStyles();

  return (
    <div className={classes.form}>
      <Typography variant="h5" className={classes.successTitle} component="div">
        <Typography variant="inherit" component="div" weight="bold">
          Thanks for subscription!
        </Typography>
        We will share with you the hottest news and the last updates about
        BondAppetit.
      </Typography>
      <Button className={classes.button} type="button" onClick={props.onClose}>
        Got It
      </Button>
    </div>
  );
};
