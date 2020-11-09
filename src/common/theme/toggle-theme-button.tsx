import React from 'react';

import { ReactComponent as SunIcon } from 'src/assets/icons/sun.svg';
import { useToggleTheme } from './theme-provider';
import { ButtonBase } from '../button-base';

export type ToggleThemeButtonProps = {};

export const ToggleThemeButton: React.FC<ToggleThemeButtonProps> = () => {
  const toggleTheme = useToggleTheme();

  return (
    <ButtonBase onClick={toggleTheme}>
      <SunIcon />
    </ButtonBase>
  );
};
