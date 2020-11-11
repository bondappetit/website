import React from 'react';

import { ButtonBase, Typography } from 'src/common';
import { ReactComponent as DownloadIcon } from 'src/assets/icons/download.svg';
import { useDocumentCardStyles } from './document-card.styles';

export type DocumentCardProps = {
  className?: string;
  link?: string;
};

export const DocumentCard: React.FC<DocumentCardProps> = (props) => {
  const classes = useDocumentCardStyles();

  return (
    <a href={props.link} className={classes.card}>
      <Typography variant="h3">{props.children}</Typography>
      <ButtonBase className={classes.download}>
        <DownloadIcon className={classes.downloadIcon} />
      </ButtonBase>
    </a>
  );
};
