import clsx from 'clsx';
import React from 'react';

import { useMainWindowStyles } from './main-window.styles';

export type MainWindowProps = {
  className?: string;
};

export const MainWindow: React.FC<MainWindowProps> = (props) => {
  const classes = useMainWindowStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <div className={classes.actions}>
        <div className={classes.actionsItem} />
        <div className={classes.actionsItem} />
        <div className={classes.actionsItem} />
      </div>
      {props.children}
    </div>
  );
};
