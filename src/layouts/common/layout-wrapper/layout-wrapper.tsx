import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useLayoutWrapperStyles } from './layout-wrapper.styles';

export type LayoutWrapperProps = {
  title?: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
};

export const LayoutWrapper: React.FC<LayoutWrapperProps> = (props) => {
  const classes = useLayoutWrapperStyles();

  return (
    <>
      <Helmet>
        <title>{props.title}</title>
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:url" content={props.ogUrl} />
        <meta property="og:image" content={props.ogImage} />
        <meta property="og:site_name" content={props.title} />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.description} />
        <meta name="twitter:url" content={props.ogUrl} />
        <meta name="twitter:image" content={props.ogImage} />
      </Helmet>
      <div className={classes.root}>{props.children}</div>
    </>
  );
};
