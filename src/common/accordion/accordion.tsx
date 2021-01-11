import React, { useCallback, useReducer } from 'react';
import clsx from 'clsx';

import { useAccordionStyles } from './accordion.styles';
import { AccordionContext } from './accordion-context';

export type AccordionProps = {
  className?: string;
};

const initialState = {
  expanded: false,
  detailsHeight: 0,
  summaryHeight: 0
};

const reducer = (
  state: typeof initialState,
  action: { type: string; payload: Partial<typeof initialState> }
) => {
  switch (action.type) {
    case 'setState':
      return {
        ...state,
        ...action.payload
      };
    default:
      return initialState;
  }
};

export const Accordion: React.FC<AccordionProps> = (props) => {
  const classes = useAccordionStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleExpand = useCallback(() => {
    dispatch({
      type: 'setState',
      payload: {
        expanded: !state.expanded
      }
    });
  }, [state]);

  const handleDetailHeight = useCallback((height: number) => {
    dispatch({
      type: 'setState',
      payload: {
        detailsHeight: height
      }
    });
  }, []);

  const handleSummaryHeight = useCallback((height: number) => {
    dispatch({
      type: 'setState',
      payload: {
        summaryHeight: height
      }
    });
  }, []);

  return (
    <AccordionContext.Provider
      value={{
        expanded: state.expanded,
        handleExpand,
        handleSummaryHeight,
        handleDetailHeight
      }}
    >
      <div
        className={clsx(classes.root, props.className, {
          [classes.hided]: !state.expanded
        })}
        style={{
          height: state.expanded
            ? state.detailsHeight + state.summaryHeight
            : state.summaryHeight
        }}
      >
        {props.children}
      </div>
    </AccordionContext.Provider>
  );
};
