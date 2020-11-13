import React, { useState } from 'react';
import clsx from 'clsx';

import { useInputStyles } from './input.styles';

export type InputProps = React.HTMLProps<HTMLInputElement> & {
  label?: string;
  error?: boolean;
  htmlFor?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [focus, setFocus] = useState(false);

    const classes = useInputStyles();

    const { className, onFocus, onBlur, ...restOfProps } = props;

    const classNamesWrapper = clsx(classes.root, className, {
      [classes.readOnly]: props.readOnly,
      [classes.disabled]: props.disabled
    });

    const classNamesInput = clsx(classes.input, {
      [classes.readOnly]: props.readOnly,
      [classes.disabled]: props.disabled
    });

    const classNamesLabel = clsx(classes.label, {
      [classes.focus]:
        focus || props?.value || typeof props?.value === 'number',
      [classes.error]: props.error
    });

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(event);
      setFocus(true);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);
      setFocus(false);
    };

    return (
      <div className={classNamesWrapper}>
        <label htmlFor={props.htmlFor} className={classes.labelWrap}>
          <span className={classNamesLabel}>{props.label}</span>
          <input
            {...restOfProps}
            ref={ref}
            id={props.htmlFor}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={classNamesInput}
          />
        </label>
      </div>
    );
  }
);

Input.displayName = 'Input';
