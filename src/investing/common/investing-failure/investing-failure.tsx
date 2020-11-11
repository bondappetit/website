import React from 'react';

import { ReactComponent as RedLine } from 'src/assets/images/red-line.svg';
import { InvestingInfo } from '../investing-info';
import { useInvestingFailureStyles } from './investing-failure.styles';

export type InvestingFailureProps = {
  onClick: () => void;
};

export const InvestingFailure: React.FC<InvestingFailureProps> = (props) => {
  const classes = useInvestingFailureStyles();

  return (
    <InvestingInfo
      title={
        <>
          <RedLine className={classes.redLine} />
          Failed :(
        </>
      }
      subtitle={
        <>Oh-oh, something went wrong. Please try the operation again</>
      }
      onClick={props.onClick}
      button="Try again"
    />
  );
};
