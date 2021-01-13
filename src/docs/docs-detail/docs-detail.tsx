import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useParams } from 'react-router-dom';

import { DocsRenderer } from 'src/docs-renderer';
import { DOCS } from '../common';

export const DocsDetail: React.FC = () => {
  const tableOfContents = useMemo(() => {
    return Object.keys(DOCS).map((text) => ({
      text,
      id: nanoid(),
      external: true
    }));
  }, []);

  const params = useParams<{ contractName: string }>();

  return (
    <DocsRenderer tableOfContents={tableOfContents}>
      {DOCS[params.contractName]}
    </DocsRenderer>
  );
};
