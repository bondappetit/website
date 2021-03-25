import React from 'react';

import { Button, Input, Typography } from 'src/common';
import { useContactsNews } from '../common';
import { useContactsNewsFloatStyles } from './contacts-news-float.styles';

export const ContactsNewsFloatForm: React.FC<{ onSuccess: () => void }> = (
  props
) => {
  const classes = useContactsNewsFloatStyles();

  const formik = useContactsNews(props.onSuccess);

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
        value={formik.values.email}
        error={Boolean(formik.errors.email)}
      />
      <Button className={classes.button} type="submit">
        Subscribe
      </Button>
    </form>
  );
};
