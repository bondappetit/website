import React from 'react';
import clsx from 'clsx';

import { LayoutLogo } from '../layout-logo';
import { LayoutMenu } from '../layout-menu';
import { useLayoutHeaderStyles } from './layout-header.styles';

export type LayoutHeaderProps = {
  rightButton?: React.ReactNode;
};

export const LayoutHeader: React.FC<LayoutHeaderProps> = (props) => {
  const classes = useLayoutHeaderStyles();

  return (
    <header className={classes.root}>
      <div className={clsx(classes.col, classes.leftButton)}>
        <LayoutLogo />
      </div>
      <div className={clsx(classes.col, classes.menu)}>
        <LayoutMenu />
      </div>
      <div className={clsx(classes.col, classes.rightButton)}>
        {props.rightButton}
      </div>
    </header>
  );
};
