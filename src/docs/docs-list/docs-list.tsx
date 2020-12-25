import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { PageWrapper, Link, Typography } from 'src/common';
import { MainLayout } from 'src/layouts';
import { URLS } from 'src/router/urls';
import { useDocsListStyles } from './docs-list.styles';
import { DOCS } from '../common';

export const DocsList: React.FC = () => {
  const classes = useDocsListStyles();

  return (
    <MainLayout>
      <PageWrapper>
        <ul className={classes.list}>
          {Object.keys(DOCS).map((contractName) => (
            <li key={contractName} className={classes.listItem}>
              <Link
                component={ReactRouterLink}
                to={URLS.docs.detail(contractName)}
              >
                <Typography variant="body1" component="span">
                  {contractName}
                </Typography>
              </Link>
            </li>
          ))}
        </ul>
      </PageWrapper>
    </MainLayout>
  );
};
