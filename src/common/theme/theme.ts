export type Colors = {
  primary: string;
  secondary: string;
  error: string;
  tokenTitleLine: string;
  grey: string;
  blue: string;
  red: string;
  yellow: string;
  green: string;
  pink: string;
  darkGrey: string;
  darkBlue: string;
};

export type ThemeModes = 'light' | 'dark';

const mainColors = {
  grey: '#A9A9A',
  blue: '#326BFF',
  red: '#DE4909',
  yellow: '#DEBC09',
  green: '#09DE78',
  pink: '#FF35EB',
  darkGrey: '#EBEEEF',
  darkBlue: '#3280BB'
};

export const themeModes: Record<ThemeModes, Colors> = {
  light: {
    primary: '#000',
    secondary: '#fff',
    tokenTitleLine: '#ffdc24',
    error: '#eb5757',
    ...mainColors
  },

  dark: {
    primary: '#fff',
    secondary: '#121314',
    tokenTitleLine: '#243aff',
    error: '#eb5757',
    ...mainColors
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
