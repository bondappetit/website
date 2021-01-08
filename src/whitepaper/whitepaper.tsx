import React from 'react';

import WhitepaperMd from 'src/assets/md/bondappétit_whitepaper.md';
import WhitepaperPdf from 'src/assets/pdf/whitepaper.pdf';
import OnepagerPdf from 'src/assets/pdf/BA-concept.pdf';
import { Typography, Link } from 'src/common';
import { DocsRenderer } from '../docs-renderer';
import { useWhitepaperStyles } from './whitepaper.styles';

export const WhitePaper: React.FC = () => {
  const classes = useWhitepaperStyles();

  return (
    <DocsRenderer
      header={
        <div className={classes.header}>
          <Typography className={classes.title} variant="h1">
            BondAppétit Protocol
          </Typography>
          <Link
            href={WhitepaperPdf}
            className={classes.link}
            target="_blank"
            color="blue"
          >
            ↓ whitepaper.pdf
          </Link>
          <Link
            href={OnepagerPdf}
            className={classes.link}
            target="_blank"
            color="blue"
          >
            ↓ investment-deck.pdf
          </Link>
        </div>
      }
    >
      {WhitepaperMd}
    </DocsRenderer>
  );
};
