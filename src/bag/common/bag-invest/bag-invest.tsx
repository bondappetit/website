import clsx from 'clsx';
import React from 'react';

import { Button, Link } from 'src/common';
import OnepagerPdf from 'src/assets/pdf/bondappetit_litepaper.pdf';
import { BagTitle } from '../bag-title';
import { useBagInvestStyles } from './bag-invest.styles';

export type BagInvestProps = {
  className?: string;
  onContact?: () => void;
};

export const BagInvest: React.FC<BagInvestProps> = (props) => {
  const classes = useBagInvestStyles();

  return (
    <div className={clsx(classes.root, props.className)} id="invest">
      <BagTitle
        title="Invest in BondAppétit"
        text={
          <>
            BondAppétit provides a unique opportunity for early investors.
            Become a part of the protocol on early stage with special offer
          </>
        }
      />
      <div className={classes.grid}>
        <Button className={classes.contacts} onClick={props.onContact}>
          Contact
        </Button>
        <Button
          className={classes.litpaper}
          component={Link}
          variant="outlined"
          href={OnepagerPdf}
        >
          Download Litepaper
        </Button>
      </div>
    </div>
  );
};
