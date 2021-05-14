import React from 'react';

import { ReactComponent as ExpandIcon } from 'src/assets/icons/plus.svg';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from 'src/common';
import { useStablecoinFaqStyles } from './stablecoin-faq.styles';
import { FAQ } from '../constants';

export type StablecoinFaqProps = {
  className?: string;
};

export const StablecoinFaq: React.FC<StablecoinFaqProps> = (props) => {
  const classes = useStablecoinFaqStyles();

  return (
    <div className={props.className} id="faq">
      <Typography variant="h3" weight="bold" className={classes.title}>
        Learn more about USDap
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
