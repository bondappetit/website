import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import docs from 'src/assets/docx/BondAppétit Whitepaper.md';
import {
  MarkdownHeading,
  MarkdownLink,
  MarkdownImage,
  useScrollSpy
} from 'src/common';
import { MainLayout } from 'src/layouts';
import {
  WhitepaperParagraph,
  WhitepaperTableOfContents,
  WhitepaperTableOfContentsProps
} from './common';
import { useWhitepaperStyles } from './whitepaper.styles';

export type WhitepaperProps = unknown;

const HEADINGS = 'h1, h2, h3, h4, h5, h6';

const renderers = {
  paragraph: WhitepaperParagraph,
  link: MarkdownLink,
  heading: MarkdownHeading,
  image: MarkdownImage
};

export const Whitepaper: React.FC<WhitepaperProps> = () => {
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

    docs.match(/#+/g)?.forEach((char, index) => {
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
        <ReactMarkdown
          plugins={[gfm]}
          className={classes.markdown}
          renderers={renderers}
        >
          {docs}
        </ReactMarkdown>
      </div>
    </MainLayout>
  );
};
