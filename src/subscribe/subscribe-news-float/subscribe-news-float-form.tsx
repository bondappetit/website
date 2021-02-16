import React from 'react';

import { Button, Input, Typography } from 'src/common';
import { useSubscribeNews } from '../common';
import { useSubscribeNewsFloatStyles } from './subscribe-news-float.styles';

export const SubscribeNewsFloatForm: React.FC<{ onSuccess: () => void }> = (
  props
) => {
  const classes = useSubscribeNewsFloatStyles();

  const formik = useSubscribeNews(props.onSuccess);

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <Typography variant="h5" className={classes.title}>
        Stay tuned with BondAppetit updates, subscibe for our emails
      </Typography>
      <Input
        name="email"
        placeholder="Enter address"
        disabled={formik.isSubmitting}
        onChange={formik.handleChange}
        className={classes.input}
        variant="small"
        error={Boolean(formik.errors.email)}
      />
      <Button className={classes.button} type="submit">
        Subscribe
      </Button>
    </form>
  );
};
