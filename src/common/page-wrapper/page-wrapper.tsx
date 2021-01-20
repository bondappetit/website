import React, { forwardRef } from 'react';
import clsx from 'clsx';

import { usePageWrapperStyles } from './page-wrapper.styles';

export type PageWrapperProps = {
  className?: string;
  children?: React.ReactNode;
};

export const PageWrapper = forwardRef<HTMLDivElement, PageWrapperProps>(
  ({ className, children }, ref) => {
    const classes = usePageWrapperStyles();

    return (
      <div ref={ref} className={clsx(classes.root, className)}>
        {children}
      </div>
    );
  }
);

PageWrapper.displayName = 'PageWrapper';
