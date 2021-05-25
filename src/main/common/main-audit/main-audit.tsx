import clsx from 'clsx';
import React from 'react';

import { Link, Typography } from 'src/common';
import { useMainAuditStyles } from './main-audit.styles';
import { MainWindow } from '../main-window';

export type MainAuditProps = {
  className?: string;
  companyLogo?: React.ReactNode;
  auditLink?: string;
};

export const MainAudit: React.VFC<MainAuditProps> = (props) => {
  const classes = useMainAuditStyles();

  return (
    <MainWindow className={clsx(classes.root, props.className)}>
      <div className={classes.content}>
        <Typography variant="h4" className={classes.text}>
          ~ %{' '}
          <Typography variant="inherit" weight="semibold">
            Security
          </Typography>
        </Typography>
        <Typography variant="h4" className={classes.text}>
          {'>>>'} check_security(protocol)
        </Typography>
        <Typography
          variant="h4"
          className={clsx(classes.title, classes.text)}
          component="div"
        >
          <Typography variant="inherit">
            Audited and Verified by&#160;
          </Typography>
          <span className={classes.logo}>{props.companyLogo}</span>
        </Typography>
        <Typography variant="h4" className={classes.link}>
          <Link href={props.auditLink} target="_blank" color="blue">
            Read security report
          </Link>
        </Typography>
      </div>
    </MainWindow>
  );
};
