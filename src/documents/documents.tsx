import clsx from 'clsx';
import React from 'react';

import InvestmentDeckPdf from 'src/assets/pdf/investment-deck.pdf';
import WhitepaperPdf from 'src/assets/pdf/whitepaper.pdf';
import { Typography } from 'src/common';
import { DocumentCard } from './common';
import { useDocumentsStyles } from './documents.styles';

export type DocumentsProps = {
  className?: string;
  title: React.ReactNode;
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
        {props.title}
      </Typography>
      <div className={classes.row}>
        <DocumentCard link={WhitepaperPdf}>Whitepaper</DocumentCard>
        <DocumentCard link={InvestmentDeckPdf}>Investment Deck</DocumentCard>
      </div>
    </div>
  );
};
