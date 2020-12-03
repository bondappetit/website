import React, { useEffect, useRef, useState } from 'react';
import MediumEditor from 'medium-editor';
import 'medium-editor/dist/css/medium-editor.min.css';
import TurndownService from 'turndown';
import clsx from 'clsx';

import { useVotingMediumEditorStyles } from './voting-medium-editor.styles';

export type VotingMediumEditorProps = {
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
  options?: MediumEditor.CoreOptions;
  label?: string;
};

const defaultOptions = {
  placeholder: {
    text: 'Proposal description...',
    hideOnClick: false
  }
};

export const VotingMediumEditor: React.FC<VotingMediumEditorProps> = ({
  onChange,
  className,
  ...props
}) => {
  const classes = useVotingMediumEditorStyles();
  const [focus, setFocus] = useState(false);
  const turndownService = useRef(new TurndownService());
  const editor = useRef<HTMLDivElement | null>(null);
  const onChangeRef = useRef(onChange);
  const options = useRef({ ...defaultOptions, ...props.options });

  useEffect(() => {
    const medium = new MediumEditor(
      `.${editor.current?.className}`,
      options.current
    );

    medium.subscribe('editableInput', (_, editable) => {
      if (!onChangeRef.current) return;

      onChangeRef.current(turndownService.current.turndown(editable.innerHTML));
    });

    return () => {
      medium.destroy();
    };
  }, []);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.focus]: focus || props.value
      })}
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      {!props.value && !focus && (
        <span className={classes.label}>{props.label}</span>
      )}
      <div ref={editor} className={classes.input} />
    </div>
  );
};
