import React from 'react';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';

import { Link } from 'src/common';
import { DocsRenderer } from 'src/docs-renderer';
import { URLS } from 'src/router/urls';
import { ReactComponent as ArrowLeftIcon } from 'src/assets/icons/arrow-left.svg';
import { DOCS } from '../common';

export const DocsDetail: React.FC = () => {
  const params = useParams<{ contractName: string }>();

  return (
    <DocsRenderer
      header={
        <Link component={ReactRouterLink} to={URLS.docs.list}>
          <ArrowLeftIcon width="40" height="40" />
        </Link>
      }
    >
      {DOCS[params.contractName]}
    </DocsRenderer>
  );
};
