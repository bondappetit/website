import React, { useEffect, useMemo, useState } from 'react';
import { ThemeProvider as JssThemeProvider } from 'react-jss';
import { useLocalStorage, useMedia } from 'react-use';

import { theme, themeModes, ThemeModes } from './theme';

const THEME_KEY = 'bond:theme';
const toggleThemeContext = React.createContext<(() => void) | undefined>(
  undefined
);

export const useToggleTheme = () => {
  return React.useContext(toggleThemeContext);
};

export const ThemeProvider: React.FC = React.memo((props) => {
  const isDark = useMedia('(prefers-color-scheme: dark)');
  const [themeMode, setThemeMode] = useState<ThemeModes>(
    isDark ? 'dark' : 'light'
  );
  const [persistedThemeMode, persistThemeMode] = useLocalStorage(THEME_KEY);

  const handlePersistTheme = () => {
    if (persistedThemeMode === 'dark' || (!persistedThemeMode && isDark)) {
      persistThemeMode('light');
    } else {
      persistThemeMode('dark');
    }
  };

  useEffect(() => {
    if (isDark) {
      setThemeMode('dark');
    } else {
      setThemeMode('light');
    }
  }, [isDark]);

  const currentThemeMode = useMemo(
    () => (persistedThemeMode ? (persistedThemeMode as ThemeModes) : themeMode),
    [themeMode, persistedThemeMode]
  );

  return (
    <JssThemeProvider
      theme={{
        ...theme,
        colors: themeModes[currentThemeMode].colors,
        images: themeModes[currentThemeMode].images
      }}
    >
      <toggleThemeContext.Provider value={handlePersistTheme}>
        {props.children}
      </toggleThemeContext.Provider>
    </JssThemeProvider>
  );
});
