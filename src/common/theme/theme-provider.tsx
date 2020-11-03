import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider as JssThemeProvider } from 'react-jss';
import useLocalStorage from 'react-use/esm/useLocalStorage';

import { theme, themeModes, ThemeModes } from './theme';

const THEME_KEY = 'bond:theme';
const toggleThemeContext = React.createContext<(() => void) | undefined>(
	undefined
);

export const useToggleTheme = () => {
	return React.useContext(toggleThemeContext);
};

export const ThemeProvider: React.FC = React.memo((props) => {
	const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
	const [themeMode, setThemeMode] = useState<ThemeModes>(
		mediaQuery.matches ? 'dark' : 'light'
	);
	const [persistedThemeMode, persistThemeMode] = useLocalStorage(THEME_KEY);

	const handlePersistTheme = () => {
		if (
			persistedThemeMode === 'dark' ||
			(!persistedThemeMode && mediaQuery.matches)
		) {
			persistThemeMode('light');
		} else {
			persistThemeMode('dark');
		}
	};

	const handleToggleTheme = useCallback((event: MediaQueryListEvent) => {
		if (event.matches) {
			setThemeMode('dark');
		} else {
			setThemeMode('light');
		}
	}, []);

	useEffect(() => {
		mediaQuery.addListener?.(handleToggleTheme);

		return () => {
			mediaQuery.removeListener?.(handleToggleTheme);
		};
	});

	return (
		<JssThemeProvider
			theme={{
				...theme,
				colors:
					themeModes[
						persistedThemeMode ? (persistedThemeMode as ThemeModes) : themeMode
					]
			}}
		>
			<toggleThemeContext.Provider value={handlePersistTheme}>
				{props.children}
			</toggleThemeContext.Provider>
		</JssThemeProvider>
	);
});
