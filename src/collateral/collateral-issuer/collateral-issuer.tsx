import React from 'react';

import { PageWrapper, Typography } from 'src/common';
import { MainLayout } from 'src/layouts';
import { URLS } from 'src/router/urls';
import { ReactComponent as RuFlagicon } from 'src/assets/icons/ru-flag.svg';
import { useCollateralIssuerStyles } from './collateral-issuer.styles';
import { CollateralDescription } from '../common';

export const CollateralIssuer: React.FC = () => {
  const classes = useCollateralIssuerStyles();

  return (
    <MainLayout>
      <PageWrapper className={classes.root}>
        <CollateralDescription
          backLink={{ to: URLS.collateral.list, title: 'Collaterals' }}
          title="Rusal Group"
          type="Issuer"
          url="rusal.ru"
          className={classes.description}
        >
          RUSAL is a leading company in the global aluminium industry, producing
          metal with a low carbon footprint. 90% of the Company&apos;s aluminium
          is produced from renewable electricity, and by implementing innovative
          and energy-saving technologies RUSAL is able to reduce greenhouse gas
          emissions at all production stages. This has enabled RUSAL to become
          one of the first in the world to master the production of
          &apos;green&apos; metal under the ALLOW brand.
        </CollateralDescription>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            <Typography variant="h4" component="div">
              Founded
            </Typography>
            <span className={classes.spacer} />
            <Typography variant="h4" component="div">
              1989
            </Typography>
          </li>
          <li className={classes.listItem}>
            <Typography variant="h4" component="div">
              Country
            </Typography>
            <span className={classes.spacer} />
            <Typography variant="h4" component="div">
              <RuFlagicon className={classes.flag} />
              Russia
            </Typography>
          </li>
          <li className={classes.listItem}>
            <Typography variant="h4" component="div">
              Industry
            </Typography>
            <span className={classes.spacer} />
            <Typography variant="h4" component="div">
              Metallurgy
            </Typography>
          </li>
          <li className={classes.listItem}>
            <Typography variant="h4" component="div">
              Turnover
            </Typography>
            <span className={classes.spacer} />
            <Typography variant="h4" component="div">
              $ 156,480,724
            </Typography>
          </li>
          <li className={classes.listItem}>
            <Typography variant="h4" component="div">
              Credit Rating
            </Typography>
            <span className={classes.spacer} />
            <Typography variant="h4" component="div">
              ruA+
            </Typography>
          </li>
          <li className={classes.listItem}>
            <Typography variant="h4" component="div">
              Total historical volume of issued bonds (USD)
            </Typography>
            <span className={classes.spacer} />
            <Typography variant="h4" component="div">
              $ 168,856,420
            </Typography>
          </li>
          <li className={classes.listItem}>
            <Typography variant="h4" component="div">
              First issue date
            </Typography>
            <span className={classes.spacer} />
            <Typography variant="h4" component="div">
              21 Dec 1989
            </Typography>
          </li>
          <li className={classes.listItem}>
            <Typography variant="h4" component="div">
              Total historical number of defaults
            </Typography>
            <span className={classes.spacer} />
            <Typography variant="h4" component="div">
              3
            </Typography>
          </li>
        </ul>
      </PageWrapper>
    </MainLayout>
  );
};
