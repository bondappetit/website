export type Colors = {
  primary: string;
  secondary: string;
  tokenTitleLine: string;
};

export type ThemeModes = 'light' | 'dark';

export const themeModes: Record<ThemeModes, Colors> = {
  light: {
    primary: '#000',
    secondary: '#fff',
    tokenTitleLine: '#ffdc24'
  },

  dark: {
    primary: '#fff',
    secondary: '#121314',
    tokenTitleLine: '#243aff'
  }
};

export const theme = {
  colors: themeModes.light,

  mixins: {
    hover: () => '@media (hover: hover)' as const
  },

  breakpoints: {
    xs: () => '@media (min-width: 0px)' as const,
    sm: () => '@media (min-width: 600px)' as const,
    md: () => '@media (min-width: 960px)' as const,
    lg: () => '@media (min-width: 1280px)' as const,
    xl: () => '@media (min-width: 1920px)' as const
  }
} as const;

export type Theme = typeof theme;
