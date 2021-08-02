import clsx from 'clsx';
import React from 'react';

import { Link, Typography } from 'src/common';
import { CollateralPublicKey, useCollateralRealAssets } from '../common';
import { useCollateralCheckStyles } from './collateral-check.styles';

const VERIFICATION_SERVICE = 'https://8gwifi.org/rsasignverifyfunctions.jsp';

export type CollateralCheckProps = {
  isinCode: string;
};

export const CollateralCheck: React.VFC<CollateralCheckProps> = (props) => {
  const tableData = useCollateralRealAssets();

  const classes = useCollateralCheckStyles();

  const company = tableData.value?.tableDataMap.get(props.isinCode);

  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.description}>
        To insure transparency of collateral all our data signed by regulated
        entity. Download public key{' '}
        <Link
          color="blue"
          target="_blank"
          href="https://wise-wolves.finance/pk/pk-oapi-b.txt"
        >
          here
        </Link>
      </Typography>
      <div className={classes.card}>
        <Typography variant="body2" className={classes.cardTitle}>
          Status:
        </Typography>
        <Typography
          variant="body1"
          className={clsx({
            [classes.valid]: company?.isValid && !tableData.loading,
            [classes.invalid]: !company?.isValid && !tableData.loading
          })}
        >
          {tableData.loading ? (
            '...'
          ) : (
            <>{company?.isValid ? '✓ Valid' : '✕ Invalid'}</>
          )}
        </Typography>
      </div>
      <div className={classes.card}>
        <Typography variant="body2" className={classes.cardTitle}>
          Data:
        </Typography>
        <Typography variant="body1" className={classes.cardText}>
          {tableData.loading ? '...' : company?.data}
        </Typography>
      </div>
      <CollateralPublicKey className={classes.card} />
      <div className={classes.card}>
        <Typography variant="body2" className={classes.cardTitle}>
          Signature:
        </Typography>
        <Typography variant="body1" className={classes.cardText}>
          {tableData.loading ? '...' : company?.signature}
        </Typography>
      </div>
      <div className={classes.card}>
        <Typography variant="body2" className={classes.cardTitle}>
          Algorithm:
        </Typography>
        <Typography variant="body1" className={classes.cardText}>
          sha512WithRSA
        </Typography>
      </div>
      <div className={classes.card}>
        <Typography variant="body2" className={classes.cardTitle}>
          Key size:
        </Typography>
        <Typography variant="body1" className={classes.cardText}>
          1024 bit
        </Typography>
      </div>
      <div className={classes.card}>
        <Typography variant="body2" className={classes.cardTitle}>
          Verification service:
        </Typography>
        <Typography variant="body1" className={classes.cardText}>
          <Link href={VERIFICATION_SERVICE} target="_blank" color="blue">
            {VERIFICATION_SERVICE}
          </Link>
        </Typography>
      </div>
    </div>
  );
};
