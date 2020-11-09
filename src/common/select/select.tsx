import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import useClickAway from 'react-use/esm/useClickAway';

import { ReactComponent as SelectArrowIcon } from 'src/assets/icons/select-arrow.svg';
import { Option, SelectContext } from './select.context';
import { useSelectStyles } from './select.styles';

export type SelectProps = {
  onChange?: (value?: string | number) => void;
  children: React.ReactNode;
  value?: string | number;
  label?: string;
  className?: string;
};

export const Select: React.FC<SelectProps> = (props) => {
  const classes = useSelectStyles();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const options = useRef<Record<string, Option>>({});
  const [currentOption, setCurrentOption] = useState<Option>({
    label: '',
    value: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useClickAway(dropdownRef, handleClose);

  const handleAddOption = (option: Option) => {
    if (!option.value) return;

    options.current[option.value] = option;
  };

  const handleSetOption = (option: Option) => {
    setCurrentOption(option);

    handleClose();

    props.onChange?.(option.value);
  };

  const handleClick = () => {
    handleOpen();
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  return (
    <SelectContext.Provider value={{ handleAddOption, handleSetOption }}>
      <div className={clsx(classes.wrap, props.className)} ref={dropdownRef}>
        <span
          className={clsx(classes.label, {
            [classes.focus]: focus || currentOption?.value
          })}
        >
          {props.label}
        </span>
        <div
          className={classes.select}
          tabIndex={0}
          onClick={handleClick}
          onKeyPress={handleClick}
          onBlur={handleBlur}
          role="button"
        >
          {currentOption?.label}
          <SelectArrowIcon
            className={clsx(classes.icon, { [classes.open]: open })}
          />
        </div>
        {open && <div className={classes.dropdown}>{props.children}</div>}
      </div>
    </SelectContext.Provider>
  );
};
