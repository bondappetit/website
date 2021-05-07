import clsx from 'clsx';
import React from 'react';

import { Plate } from 'src/common';
import { DocumentCard } from 'src/common/document-card';
import OnepagerPdf from 'src/assets/pdf/bondappetit_litepaper.pdf';
import { BagTitle } from '../bag-title';
import { useBagInvestStyles } from './bag-invest.styles';

export type BagInvestProps = {
  className?: string;
};

export const BagInvest: React.FC<BagInvestProps> = (props) => {
  const classes = useBagInvestStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <BagTitle
        bold="Invest"
        text={
          <>
            BondAppétite provides a unique opportunity for early investors.
            Become a part of the protocol on early stage with special offer
          </>
        }
      />
      <div className={classes.grid}>
        <DocumentCard className={classes.litpaper} link={OnepagerPdf}>
          Litepaper
        </DocumentCard>
        <Plate className={classes.contacts}>{props.children}</Plate>
      </div>
    </div>
  );
};
