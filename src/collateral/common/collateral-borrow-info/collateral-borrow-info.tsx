import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Typography, Button } from 'src/common';
import { URLS } from 'src/router/urls';
import { useCollateralBorrowInfoStyles } from './collateral-borrow-info.styles';
import { CollateralTable } from '../collateral-table';
import { TableData } from '../collateral.types';

export type ColateralBorrowInfoProps = {
  tableData?: TableData;
  id?: string;
  onValid?: (isinCode: string) => void;
};

export const CollateralBorrowInfo: React.VFC<ColateralBorrowInfoProps> = (
  props
) => {
  const classes = useCollateralBorrowInfoStyles();

  return (
    <>
      <div className={classes.section}>
        <CollateralTable
          onValid={props.onValid}
          id={props.id}
          data={props.tableData}
          emptyFirstCol
        />
      </div>
      <div className={classes.section}>
        <Typography variant="h2" className={classes.borrowTitle}>
          Borrow from BondAppetit
        </Typography>
        <Typography variant="h5" className={classes.borrowText}>
          BondAppetit provides an opportunity to borrow funds providing
          fixed-income
          <br />
          securities as collateral. Explore terms and benefits of our offer.
        </Typography>
        <Typography variant="h3">
          <Button component={ReactRouterLink} to={URLS.collateral.borrow}>
            Explore
          </Button>
        </Typography>
      </div>
    </>
  );
};
