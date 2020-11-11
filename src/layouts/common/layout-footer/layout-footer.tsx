import React from 'react';

import { Typography } from 'src/common';
import { useLayoutFooterStyles } from './layout-footer.styles';

export const LayoutFooter: React.FC = () => {
  const classes = useLayoutFooterStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body1">
        © BondAppétit, {new Date().getFullYear()}
      </Typography>
    </footer>
  );
};
