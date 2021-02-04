import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Link, Status, StatusProps, Typography } from 'src/common';
import { useCollateralDescriptionStyles } from './collateral-description.styles';

export type CollateralDescriptionProps = {
  className?: string;
  backLink: {
    to: string;
    title: string;
  };
  title: string;
  type: string;
  url?: string;
};

export const Colors: Record<string, StatusProps['color']> = {
  Issuer: 'beige',
  Borrower: 'pink'
};

export const CollateralDescription: React.FC<CollateralDescriptionProps> = (
  props
) => {
  const classes = useCollateralDescriptionStyles();

  return (
    <div className={props.className}>
      <Typography variant="body1" align="center" className={classes.backLink}>
        <Link to={props.backLink.to} color="blue" component={ReactRouterLink}>
          ← {props.backLink.title}
        </Link>
      </Typography>
      <Typography variant="h1" align="center" className={classes.title}>
        {props.title}
      </Typography>
      <Typography
        variant="h5"
        align="center"
        className={classes.subtitle}
        component="div"
      >
        <Status
          color={Colors[props.type]}
          variant="contained"
          className={classes.status}
        >
          {props.type}
        </Status>
        {!!props.url && (
          <Link href={`https://${props.url}`} color="blue" target="_blank">
            {props.url}
          </Link>
        )}
      </Typography>
      <Typography variant="h4" align="center" className={classes.description}>
        {props.children}
      </Typography>
    </div>
  );
};
