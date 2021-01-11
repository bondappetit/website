import React, { useRef, useContext, useCallback } from 'react';
import clsx from 'clsx';
import { useMount, useUnmount } from 'react-use';

import { useAccordionStyles } from './accordion.styles';
import { AccordionContext } from './accordion-context';

export type AccordionDetailsProps = {
  className?: string;
};

export const AccordionDetails: React.FC<AccordionDetailsProps> = (props) => {
  const classes = useAccordionStyles();

  const ref = useRef<HTMLDivElement>(null);
  const accordionContext = useContext(AccordionContext);

  const handleSetDetailHeight = useCallback(() => {
    if (ref.current?.clientHeight) {
      accordionContext?.handleDetailHeight(ref.current.clientHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMount(() => {
    handleSetDetailHeight();
    window.addEventListener('resize', handleSetDetailHeight);
  });

  useUnmount(() => {
    window.removeEventListener('resize', handleSetDetailHeight);
  });

  return (
    <div className={clsx(classes.details, props.className)} ref={ref}>
      {props.children}
    </div>
  );
};
