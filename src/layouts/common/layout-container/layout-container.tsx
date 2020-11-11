import React from 'react';

import { useLayoutContainerStyles } from './layout-container.styles';

export const LayoutContainer: React.FC = (props) => {
  const classes = useLayoutContainerStyles();

  return <main className={classes.container}>{props.children}</main>;
};
