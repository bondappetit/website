import clsx from 'clsx';
import React, { useCallback } from 'react';

import { Link } from 'src/common';
import { useWhitepaperTableOfContentsStyles } from './whitepaper-table-of-contents.styles';

type TableOfContent = {
  id: string;
  title: string;
  children: TableOfContent[];
};

export type WhitepaperTableOfContentsProps = {
  className?: string;
  tableOfContent: TableOfContent[];
  activeElement?: string;
};

export const WhitepaperTableOfContents: React.FC<WhitepaperTableOfContentsProps> = (
  props
) => {
  const classes = useWhitepaperTableOfContentsStyles();

  const sublistHasActiveId = useCallback(
    (sublist: TableOfContent[] | TableOfContent): boolean => {
      if (!Array.isArray(sublist)) {
        return sublist.id === props.activeElement;
      }

      return sublist.some((sub) => {
        return sublistHasActiveId(sub);
      });
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
              {list.title}
            </Link>
            {!!list.children.length && (
              <WhitepaperTableOfContents
                activeElement={props.activeElement}
                tableOfContent={list.children}
                className={
                  list.id === props.activeElement ||
                  sublistHasActiveId(list.children)
                    ? undefined
                    : classes.subMenuInactive
                }
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
