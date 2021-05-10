import React from 'react';

import { ReactComponent as ExpandIcon } from 'src/assets/icons/plus.svg';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from 'src/common';
import { useBagFaqStyles } from './bag-faq.styles';
import { FAQ } from '../constants';

export type BagFaqProps = {
  className?: string;
};

export const BagFaq: React.FC<BagFaqProps> = (props) => {
  const classes = useBagFaqStyles();

  return (
    <div className={props.className} id="faq">
      <Typography variant="h3" weight="bold" className={classes.title}>
        Learn more about BAG
      </Typography>
      {FAQ.map((faqItem) => (
        <Accordion key={faqItem.title}>
          <AccordionSummary expandIcon={<ExpandIcon width="32" height="32" />}>
            <Typography variant="h5">{faqItem.title}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.detail}>
            {faqItem.body.map((faqBodyText) => (
              <Typography variant="body1" key={faqBodyText}>
                {faqBodyText}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
