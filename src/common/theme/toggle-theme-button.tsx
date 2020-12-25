import React from 'react';
import clsx from 'clsx';

import { ReactComponent as SunIcon } from 'src/assets/icons/sun.svg';
import { useToggleTheme } from './theme-provider';
import { ButtonBase } from '../button-base';

export const ToggleThemeButton: React.FC<{ className?: string }> = (props) => {
  const toggleTheme = useToggleTheme();

  return (
    <ButtonBase className={clsx(props.className)} onClick={toggleTheme}>
      <SunIcon />
    </ButtonBase>
  );
};
