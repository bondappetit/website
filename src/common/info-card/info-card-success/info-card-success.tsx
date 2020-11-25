import React from 'react';
import { useMedia } from 'react-use';

import { ReactComponent as GreenLine } from 'src/assets/images/green-line.svg';
import { InfoCardWrapper } from '../info-card-wrapper';
import { useInfoCardSuccessStyles } from './info-card-success.styles';

export type InfoCardSuccessProps = {
  onClick: () => void;
  purchased: string;
  tokenName: string;
};

export const InfoCardSuccess: React.FC<InfoCardSuccessProps> = (props) => {
  const isBiggerThanMediumDesktop = useMedia('(min-width: 960px)');
  const classes = useInfoCardSuccessStyles();

  return (
    <InfoCardWrapper
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
          {props.purchased}&nbsp;{props.tokenName}
        </>
      }
      onClick={props.onClick}
      button="Finish!"
    />
  );
};
