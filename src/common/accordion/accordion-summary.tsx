import clsx from 'clsx';
import React, {
  Children,
  cloneElement,
  useContext,
  useRef,
  useCallback
} from 'react';
import { useMount, useUnmount } from 'react-use';

import { useAccordionStyles } from './accordion.styles';
import { AccordionContext } from './accordion-context';

export type AccordionSummaryProps = {
  className?: string;
  expandIcon?: React.ReactElement;
};

export const AccordionSummary: React.FC<AccordionSummaryProps> = (props) => {
  const classes = useAccordionStyles();

  const ref = useRef<HTMLDivElement>(null);

  const accordionContext = useContext(AccordionContext);

  const handleSetSummaryHeight = useCallback(() => {
    if (ref.current?.clientHeight) {
      accordionContext?.handleSummaryHeight(ref.current.clientHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMount(() => {
    handleSetSummaryHeight();
    window.addEventListener('resize', handleSetSummaryHeight);
  });

  useUnmount(() => {
    window.removeEventListener('resize', handleSetSummaryHeight);
  });

  const expandIcon = Children.only(props.expandIcon);

  const expandIconClassName = expandIcon?.props.className;

  return (
    <div
      className={clsx(classes.summary, props.className)}
      onClick={accordionContext?.handleExpand}
      onKeyPress={accordionContext?.handleExpand}
      ref={ref}
    >
      {props.children}{' '}
      {expandIcon &&
        cloneElement(expandIcon, {
          className: clsx(classes.arrow, expandIconClassName, {
            [classes.arrowExpanded]: accordionContext?.expanded
          })
        })}
    </div>
  );
};
