import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import WhitepaperMd from 'src/assets/md/BondAppétit Whitepaper.md';
import WhitepaperPdf from 'src/assets/pdf/whitepaper.pdf';
import OnepagerPdf from 'src/assets/pdf/onepager.pdf';
import {
  MarkdownHeading,
  MarkdownLink,
  MarkdownImage,
  useScrollSpy,
  Typography,
  Link
} from 'src/common';
import { MainLayout } from 'src/layouts';
import {
  WhitepaperParagraph,
  WhitepaperTableOfContents,
  WhitepaperTableOfContentsProps
} from './common';
import { useWhitepaperStyles } from './whitepaper.styles';

const HEADINGS = 'h2, h3, h4, h5, h6';

const renderers = {
  paragraph: WhitepaperParagraph,
  link: MarkdownLink,
  heading: MarkdownHeading,
  image: MarkdownImage
};

export const Whitepaper: React.FC = () => {
  const [list, setList] = useState<
    WhitepaperTableOfContentsProps['tableOfContent']
  >([]);

  const classes = useWhitepaperStyles();

  useEffect(() => {
    const headingElements = document.querySelectorAll(HEADINGS);

    let previousIndex = 0;

    const tableOfContentObj: Record<
      number,
      WhitepaperTableOfContentsProps['tableOfContent'][number]
    > = {};

    WhitepaperMd.match(/#+/g)?.forEach((char, index) => {
      const headingElement = headingElements[index];
      if (!headingElement?.textContent) return;

      const id = String(index);

      headingElement.setAttribute('id', id);

      const heading: WhitepaperTableOfContentsProps['tableOfContent'][number] = {
        id,
        title: headingElement?.textContent,
        children: []
      };

      if (!tableOfContentObj[previousIndex]) {
        tableOfContentObj[previousIndex] = heading;
      }

      if (char.length === 2) {
        tableOfContentObj[index] = heading;

        previousIndex = index;
      } else {
        tableOfContentObj[previousIndex].children.push(heading);
      }
    });

    setList(Object.values(tableOfContentObj));
  }, []);

  const activeElement = useScrollSpy({
    sectionElements: HEADINGS,
    offsetPx: 100
  });

  return (
    <MainLayout>
      <div className={classes.root}>
        <WhitepaperTableOfContents
          className={classes.list}
          tableOfContent={list}
          activeElement={activeElement}
        />
        <div className={classes.body}>
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
              ↓ onepager.pdf
            </Link>
          </div>
          <ReactMarkdown plugins={[gfm]} renderers={renderers}>
            {WhitepaperMd}
          </ReactMarkdown>
        </div>
      </div>
    </MainLayout>
  );
};
