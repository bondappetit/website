import React, { useRef } from 'react';
import clsx from 'clsx';

import WhitepaperMd from 'src/assets/md/bondappétit_whitepaper.md';
import WhitepaperPdf from 'src/assets/pdf/whitepaper.pdf';
import OnepagerPdf from 'src/assets/pdf/BA-concept.pdf';
import {
  Typography,
  Link,
  Head,
  Portal,
  ButtonBase,
  useUpButton
} from 'src/common';
import { MainLayout } from 'src/layouts';
import { DocsRenderer } from '../docs-renderer';
import { useWhitepaperStyles } from './whitepaper.styles';

export const WhitePaper: React.FC = () => {
  const classes = useWhitepaperStyles();

  const ref = useRef<HTMLButtonElement | null>(null);

  const visible = useUpButton(ref);

  return (
    <>
      <Head title="Whitepaper" />
      <MainLayout>
        <div className={classes.header}>
          <Typography className={classes.title} variant="h1" align="center">
            BondAppétit Protocol
          </Typography>
          <Typography variant="body1" align="center">
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
          </Typography>
        </div>
        <DocsRenderer>{WhitepaperMd}</DocsRenderer>
      </MainLayout>
      <Portal>
        <ButtonBase
          className={clsx(classes.upButton, {
            [classes.upButtonVisible]: visible
          })}
          ref={ref}
        >
          UP
        </ButtonBase>
      </Portal>
    </>
  );
};
