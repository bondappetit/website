import React from 'react';

import { useLayoutWrapperStyles } from './layout-wrapper.styles';

export const LayoutWrapper: React.FC = (props) => {
  const classes = useLayoutWrapperStyles();

  return <div className={classes.root}>{props.children}</div>;
};
