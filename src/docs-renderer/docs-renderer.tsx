import clsx from 'clsx';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import math from 'remark-math';
import { useMedia, useToggle } from 'react-use';

import {
  MarkdownLink,
  MarkdownCode,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  MarkdownList,
  MarkdownListItem,
  Modal,
  SmallModal,
  Typography,
  ButtonBase
} from 'src/common';
import { ReactComponent as MenuIcon } from 'src/assets/icons/whitepaper-menu.svg';
import {
  DocsRendererParagraph,
  DocsRendererTable,
  DocsRendererTableOfContents,
  TableOfContent,
  DocsRendererMath,
  DocsRendererImage,
  DocsRendererHeading
} from './common';
import { useDocsRendererStyles } from './docs-renderer.styles';

const renderers = {
  paragraph: DocsRendererParagraph,
  link: MarkdownLink,
  linkReference: MarkdownLink,
  heading: DocsRendererHeading,
  image: DocsRendererImage,
  table: DocsRendererTable,
  tableHead: TableHead,
  tableBody: TableBody,
  tableRow: TableRow,
  tableCell: TableCell,
  code: MarkdownCode,
  list: MarkdownList,
  listItem: MarkdownListItem,
  inlineMath: ({ value }: { value: string }) => (
    <DocsRendererMath value={value} />
  ),
  math: ({ value }: { value: string }) => (
    <DocsRendererMath block value={value} />
  )
};

export type DocsRendererProps = {
  children: string;
  className?: string;
  tableOfContents?: TableOfContent[];
};

const IS_DESKTOP = '(min-width: 960px)';

export const DocsRenderer: React.FC<DocsRendererProps> = (props) => {
  const classes = useDocsRendererStyles();

  const isDesktop = useMedia(IS_DESKTOP);

  const [menuIsOpen, toggleMenu] = useToggle(false);

  return (
    <div className={clsx(classes.root, props.className)}>
      {isDesktop ? (
        <DocsRendererTableOfContents
          className={classes.tableOfContents}
          tableOfContents={props.tableOfContents}
        />
      ) : (
        <>
          {!menuIsOpen && (
            <ButtonBase className={classes.mobileToolbar} onClick={toggleMenu}>
              <MenuIcon className={classes.mobileToolbarIcon} />
              <Typography variant="body2">
                4.1 Key Actors, Borrowing Process and risks
              </Typography>
            </ButtonBase>
          )}
          <Modal
            open={menuIsOpen}
            onClose={toggleMenu}
            className={classes.mobileMenu}
          >
            <SmallModal withoutOnclose>
              <DocsRendererTableOfContents
                tableOfContents={props.tableOfContents}
              />
            </SmallModal>
          </Modal>
        </>
      )}
      <div className={classes.body}>
        <ReactMarkdown plugins={[gfm, math]} renderers={renderers}>
          {props.children}
        </ReactMarkdown>
      </div>
    </div>
  );
};
