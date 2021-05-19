/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { ReactComponent as ExpandIcon } from 'src/assets/icons/plus.svg';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Link
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
      <Typography variant="h3" weight="semibold" className={classes.title}>
        Learn more about USDap
      </Typography>
      {FAQ.map((faqItem) => (
        <Accordion key={faqItem.title}>
          <AccordionSummary expandIcon={<ExpandIcon width="32" height="32" />}>
            <Typography variant="h4">{faqItem.title}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.detail}>
            {faqItem.body.map((faqBodyText) => (
              <Typography variant="h5" key={faqBodyText}>
                {faqBodyText}
                {faqItem.link && (
                  <Link
                    component={ReactRouterLink}
                    to={faqItem.link}
                    color="blue"
                  >
                    {[window.location.protocol, window.location.host].join(
                      '//'
                    )}
                    {faqItem.link}
                  </Link>
                )}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
