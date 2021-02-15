import clsx from 'clsx';
import React from 'react';

import { Link, Plate, Typography } from 'src/common';
import { ReactComponent as AuditedIcon } from 'src/assets/icons/audited.svg';
import { useMainAuditStyles } from './main-audit.styles';

export type MainAuditProps = {
  className?: string;
  companyLogo?: React.ReactNode;
  auditLink?: string;
};

export const MainAudit: React.VFC<MainAuditProps> = (props) => {
  const classes = useMainAuditStyles();

  return (
    <Plate className={clsx(classes.root, props.className)}>
      <Typography variant="h2" className={classes.title} component="div">
        <Typography variant="inherit">Audited and Verified by&#160;</Typography>
        {props.companyLogo}
      </Typography>
      <Typography variant="h4">
        <Link href={props.auditLink} color="blue">
          Explore security report →
        </Link>
      </Typography>
      <AuditedIcon className={classes.auditedIcon} />
    </Plate>
  );
};
