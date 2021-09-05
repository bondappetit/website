import React from 'react';
import ReactMarkdown from 'react-markdown';

import { ReactComponent as ExpandIcon } from 'src/assets/icons/plus.svg';
import { Accordion, AccordionDetails, AccordionSummary } from '../accordion';
import { MarkdownLink } from '../markdown-link';
import { MarkdownList } from '../markdown-list';
import { MarkdownParagraph } from '../markdown-paragraph';
import { Typography } from '../typography';
import { useFaqStyles } from './faq.styles';

export type BagFaqProps = {
  className?: string;
  children: {
    title: string;
    body: string;
  }[];
  title: string;
};

const renderers = {
  paragraph: MarkdownParagraph,
  link: MarkdownLink,
  list: MarkdownList
};

export const Faq: React.VFC<BagFaqProps> = (props) => {
  const classes = useFaqStyles();

  return (
    <div className={props.className} id="faq">
      <Typography variant="h2" className={classes.title}>
        {props.title}
      </Typography>
      {props.children.map((faqItem) => (
        <Accordion key={faqItem.title}>
          <AccordionSummary expandIcon={<ExpandIcon width="32" height="32" />}>
            <Typography variant="h4">{faqItem.title}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.detail}>
            <ReactMarkdown renderers={renderers}>{faqItem.body}</ReactMarkdown>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
