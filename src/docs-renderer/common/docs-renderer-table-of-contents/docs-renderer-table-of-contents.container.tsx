import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useScrollSpy } from 'src/common';
import {
  TableOfContent,
  buildTableOfContents
} from '../build-table-of-contents';

const HEADINGS = 'h2, h3';

export type DocsRendererTableOfContentsContainerProps = {
  children: (
    tableOfContent: TableOfContent[],
    activeElement: string
  ) => JSX.Element;
};

export const DocsRendererTableOfContentsContainer: React.FC<DocsRendererTableOfContentsContainerProps> = (
  props
) => {
  const [tableOfContent, setTableOfContent] = useState<TableOfContent[]>([]);

  const params = useParams();

  useEffect(() => {
    const headingElements = document.querySelectorAll(HEADINGS);

    headingElements.forEach((headingElement, index) => {
      headingElement.setAttribute('id', String(index));
    });

    setTableOfContent(buildTableOfContents([...headingElements]));
  }, [params]);

  const activeElement = useScrollSpy({
    activeSectionDefault: '0',
    sectionElements: HEADINGS,
    offsetPx: 10
  });

  return <>{props.children(tableOfContent, activeElement)}</>;
};
