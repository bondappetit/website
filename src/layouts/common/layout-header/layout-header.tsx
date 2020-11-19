import React from 'react';
import clsx from 'clsx';

import { LayoutLogo } from '../layout-logo';
import { useLayoutHeaderStyles } from './layout-header.styles';

export type LayoutHeaderProps = {
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
};

export const LayoutHeader: React.FC<LayoutHeaderProps> = (props) => {
  const classes = useLayoutHeaderStyles();

  return (
    <header className={classes.root}>
      <div className={clsx(classes.col, classes.leftButton)}>
        {props.leftButton}
      </div>
      <div className={clsx(classes.col, classes.logo)}>
        <LayoutLogo />
      </div>
      <div className={clsx(classes.col, classes.rightButton)}>
        {props.rightButton}
      </div>
    </header>
  );
};
