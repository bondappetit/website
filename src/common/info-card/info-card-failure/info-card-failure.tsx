import React from 'react';

import { ReactComponent as RedLine } from 'src/assets/images/red-line.svg';
import { InfoCardWrapper } from '../info-card-wrapper';
import { useInfoCardFailureStyles } from './info-card-failure.styles';

export type InfoCardFailureProps = {
  onClick: () => void;
  buttonTitle?: string;
  title?: string;
};

export const InfoCardFailure: React.FC<InfoCardFailureProps> = (props) => {
  const classes = useInfoCardFailureStyles();

  const {
    buttonTitle = 'Try again',
    title = 'Oh-oh, something went wrong. Please try the operation again'
  } = props;

  return (
    <InfoCardWrapper
      title={
        <>
          <RedLine className={classes.redLine} />
          Failed :(
        </>
      }
      subtitle={title}
      onClick={props.onClick}
      button={buttonTitle}
    />
  );
};
