import React from 'react';

import { ButtonBase, Typography } from 'src/common';
import { ReactComponent as MailIcon } from 'src/assets/icons/mail.svg';
import { LayoutLinks } from '../layout-links';
import { useLayoutFooterStyles } from './layout-footer.styles';

export type LayoutFooterProps = {
  onSubscribe?: () => void;
};

export const LayoutFooter: React.FC<LayoutFooterProps> = (props) => {
  const classes = useLayoutFooterStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body1" className={classes.copyright}>
        © BondAppétit, {new Date().getFullYear()}
      </Typography>
      <LayoutLinks className={classes.links} />
      <ButtonBase className={classes.button} onClick={props.onSubscribe}>
        <MailIcon className={classes.icon} />
        <Typography variant="inherit">Subscribe for emails</Typography>
      </ButtonBase>
    </footer>
  );
};
