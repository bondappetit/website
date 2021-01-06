import React from 'react';

import { ReactComponent as DownloadIcon } from 'src/assets/icons/download.svg';
import { Typography } from '../typography';
import { ButtonBase } from '../button-base';
import { useDocumentCardStyles } from './document-card.styles';

export type DocumentCardProps = {
  className?: string;
  link?: string;
};

export const DocumentCard: React.FC<DocumentCardProps> = (props) => {
  const classes = useDocumentCardStyles();

  return (
    <div className={classes.root}>
      <a
        href={props.link}
        target="_blank"
        rel="noreferrer"
        className={classes.card}
      >
        <Typography variant="h3">{props.children}</Typography>
        <ButtonBase className={classes.download}>
          <DownloadIcon className={classes.downloadIcon} />
        </ButtonBase>
      </a>
    </div>
  );
};
