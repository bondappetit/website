import clsx from 'clsx';
import React, { useCallback } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { URLS } from 'src/router/urls';
import { Link } from 'src/common';
import { useDocsRendererTableOfContentsStyles } from './docs-renderer-table-of-contents.styles';
import { TableOfContent } from '../build-table-of-contents';

export type DocsRendererTableOfContentsListProps = {
  className?: string;
  tableOfContent: TableOfContent[];
  activeElement?: string;
};

export const DocsRendererTableOfContentsList: React.FC<DocsRendererTableOfContentsListProps> = (
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
            <Link
              href={!list.external ? `#${list.id}` : undefined}
              to={
                list.external && list.text
                  ? URLS.docs.detail(list.text)
                  : undefined
              }
              component={list.external ? ReactRouterLink : undefined}
              className={classes.link}
            >
              {list.id === props.activeElement && (
                <span className={classes.arrow}>→</span>
              )}{' '}
              {list.text}
            </Link>
            {!!list.childNodes?.length && (
              <DocsRendererTableOfContentsList
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
