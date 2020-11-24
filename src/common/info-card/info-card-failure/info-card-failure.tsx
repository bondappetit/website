import React from 'react';

import { ReactComponent as RedLine } from 'src/assets/images/red-line.svg';
import { InfoCardWrapper } from '../info-card-wrapper';
import { useInfoCardFailureStyles } from './info-card-failure.styles';

export type InfoCardFailureProps = {
  onClick: () => void;
};

export const InfoCardFailure: React.FC<InfoCardFailureProps> = (props) => {
  const classes = useInfoCardFailureStyles();

  return (
    <InfoCardWrapper
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
