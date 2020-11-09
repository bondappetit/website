import clsx from 'clsx';
import React from 'react';

import { Typography } from 'src/common';
import { DocumentCard } from './common';
import { useDocumentsStyles } from './documents.styles';

export type DocumentsProps = {
  className?: string;
};

export const Documents: React.FC<DocumentsProps> = (props) => {
  const classes = useDocumentsStyles();

  return (
    <div className={clsx(classes.documents, props.className)}>
      <Typography
        variant="h2"
        weight="light"
        align="center"
        className={classes.title}
      >
        Find out more about BondAppétit protocol, our unique stablecoin
        <br /> backed by real-world debt instruments (ABT), and other components
        <br />
        of BondAppétit:
      </Typography>
      <div className={classes.row}>
        <DocumentCard link="#">Whitepaper</DocumentCard>
        <DocumentCard link="#">Investment Deck</DocumentCard>
      </div>
    </div>
  );
};
