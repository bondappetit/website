import React from 'react';
import { useCopyToClipboard } from 'react-use';

import { ButtonBase } from '../button-base';
import { useMarkdownCodeStyles } from './markdown-code.styles';

export type MarkdownCodeProps = {
  value: string;
};

export const MarkdownCode: React.FC<MarkdownCodeProps> = (props) => {
  const classes = useMarkdownCodeStyles();

  const [state, copyToClipboard] = useCopyToClipboard();

  return (
    <pre className={classes.root}>
      <code>{props.value}</code>
      <ButtonBase
        className={classes.button}
        onClick={() => copyToClipboard(props.value)}
      >
        {state.value && <>copied</>}
        {!state.value && <>copy</>}
      </ButtonBase>
    </pre>
  );
};
