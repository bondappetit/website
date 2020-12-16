import React, { forwardRef } from 'react';
import clsx from 'clsx';

import { usePageWrapperStyles } from './page-wrapper.styles';

export type PageWrapperProps = React.HTMLProps<HTMLDivElement>;

export const PageWrapper = forwardRef<HTMLDivElement, PageWrapperProps>(
  ({ className, ...props }, ref) => {
    const classes = usePageWrapperStyles();

    return (
      <div ref={ref} className={clsx(classes.root, className)} {...props} />
    );
  }
);

PageWrapper.displayName = 'PageWrapper';
