import React from 'react';
import useMedia from 'react-use/esm/useMedia';

import { ReactComponent as GreenLine } from 'src/assets/images/green-line.svg';
import { InvestingInfo } from '../investing-info';
import { useInvestingSuccessStyles } from './investing-success.styles';

export type InvestingSuccessProps = {
  onClick: () => void;
  purchased?: string;
};

export const InvestingSuccess: React.FC<InvestingSuccessProps> = (props) => {
  const isBiggerThanMediumDesktop = useMedia('(min-width: 960px)');
  const classes = useInvestingSuccessStyles();

  return (
    <InvestingInfo
      title={
        <>
          <GreenLine className={classes.greenLine} />
          Congratulations!
        </>
      }
      subtitle={
        <>
          You have successfully purchased
          {!isBiggerThanMediumDesktop ? <>&nbsp;</> : ' '}
          {props.purchased}&nbsp;Bond
        </>
      }
      onClick={props.onClick}
      button="Finish!"
    />
  );
};
