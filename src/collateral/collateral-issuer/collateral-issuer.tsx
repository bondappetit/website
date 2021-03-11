import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { Head, PageWrapper, Typography } from 'src/common';
import { MainLayout } from 'src/layouts';
import { URLS } from 'src/router/urls';
import { ReactComponent as RuFlagicon } from 'src/assets/icons/ru-flag.svg';
import { useCollateralIssuerStyles } from './collateral-issuer.styles';
import { CollateralDescription, ISSUERS } from '../common';

const ISSUERS_MAP = ISSUERS.reduce<Record<string, typeof ISSUERS[number]>>(
  (acc, issuer) => {
    acc[issuer.id.toLowerCase()] = issuer;

    return acc;
  },
  {}
);

const ICONS: Record<string, typeof RuFlagicon> = {
  russia: RuFlagicon
};

export const CollateralIssuer: React.FC = () => {
  const classes = useCollateralIssuerStyles();
  const params = useParams<{ companyName: string }>();

  const company = ISSUERS_MAP[params.companyName.toLowerCase()];

  if (!company) {
    return <Redirect to={URLS.notfound} />;
  }

  return (
    <>
      <Head title={`${params.companyName}`} />
      <MainLayout>
        <PageWrapper className={classes.root}>
          <CollateralDescription
            backLink={{ to: URLS.collateral.list, title: 'Collateral' }}
            title={company.title}
            type={company.type}
            url={company.url}
            className={classes.description}
          >
            {company.description}
          </CollateralDescription>
          <ul className={classes.list}>
            {company.list.map(({ title, value }) => {
              const Icon = ICONS[value.toLowerCase()];

              return (
                <li className={classes.listItem} key={title + value}>
                  <Typography variant="h4" component="div">
                    {title}
                  </Typography>
                  <span className={classes.spacer} />
                  <Typography variant="h4" component="div">
                    {Icon && <Icon className={classes.flag} />}
                    {value}
                  </Typography>
                </li>
              );
            })}
          </ul>
        </PageWrapper>
      </MainLayout>
    </>
  );
};
