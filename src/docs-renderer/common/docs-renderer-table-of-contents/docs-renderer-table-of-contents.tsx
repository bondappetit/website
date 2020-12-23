import clsx from 'clsx';
import React, { useCallback } from 'react';

import { Link } from 'src/common';
import { useDocsRendererTableOfContentsStyles } from './docs-renderer-table-of-contents.styles';
import { TableOfContent } from '../build-table-of-contents';

export type DocsRendererTableOfContentsProps = {
  className?: string;
  tableOfContent: TableOfContent[];
  activeElement?: string;
};

export const DocsRendererTableOfContents: React.FC<DocsRendererTableOfContentsProps> = (
  props
) => {
  const classes = useDocsRendererTableOfContentsStyles();

  const sublistHasActiveId = useCallback(
    (sublist: TableOfContent[] | TableOfContent): boolean => {
      if (!Array.isArray(sublist)) {
        return sublist.id === props.activeElement;
      }

      return sublist.some(sublistHasActiveId);
    },
    [props.activeElement]
  );

  return (
    <ul className={clsx(classes.root, props.className)}>
      {props.tableOfContent.map((list) => {
        return (
          <li
            className={clsx(
              classes.item,
              list.id === props.activeElement && classes.active
            )}
            key={list.id}
          >
            <Link href={`#${list.id}`} className={classes.link}>
              {list.id === props.activeElement && (
                <span className={classes.arrow}>→</span>
              )}{' '}
              {list.text}
            </Link>
            {!!list.childNodes.length && (
              <DocsRendererTableOfContents
                activeElement={props.activeElement}
                tableOfContent={list.childNodes}
                className={clsx(classes.subList, {
                  [classes.subListActive]:
                    list.id === props.activeElement ||
                    sublistHasActiveId(list.childNodes)
                })}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
