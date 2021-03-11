import React from 'react';
import clsx from 'clsx';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Typography, Link } from 'src/common';
import { URLS } from 'src/router/urls';
import { useCollateralBorrowInfoStyles } from './collateral-borrow-info.styles';
import { CollateralTable } from '../collateral-table';
import { TableData } from '../collateral.types';

export const CollateralBorrowInfo: React.VFC<{
  tableData?: TableData;
  id?: string;
}> = (props) => {
  const classes = useCollateralBorrowInfoStyles();

  return (
    <>
      <div className={classes.section}>
        <Typography variant="h4" align="center" className={classes.assetsTitle}>
          The assets of the protocol are formed by outstanding debt of the
          borrowers, which in turn is secured by real world collateral in form
          of bonds kept on special security accounts.
        </Typography>
        <CollateralTable id={props.id} data={props.tableData} emptyFirstCol />
      </div>
      <div className={classes.section}>
        <Typography
          variant="h1"
          component="h2"
          align="center"
          className={clsx(classes.borrowText)}
        >
          Borrow from BondAppétit
        </Typography>
        <Typography variant="h4" align="center" className={classes.borrowText}>
          BondAppétit provides an opportunity to borrow funds providing
          fixed-income
          <br />
          securities as collateral. Explore terms and benefits of our offer.
        </Typography>
        <Typography align="center" variant="h3">
          <Link
            color="blue"
            component={ReactRouterLink}
            to={URLS.collateral.borrow}
          >
            Explore →
          </Link>
        </Typography>
      </div>
    </>
  );
};
