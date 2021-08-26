export type Colors = {
  primary: string;
  secondary: string;
  error: string;
  tokenTitleLine: string;
  proposalPlate: string;
  red: string;
  orange: string;
  beige: string;
  yellow: string;
  green: string;
  pink: string;
  purple: string;
  blue: string;
  blue2: string;
  blue3: string;
  blue4: string;
  grey1: string;
  grey: string;
  grey2: string;
  green1: string;
  green2: string;
  docsParagraph: string;
  white: string;
  black: string;
  swap: string;
};

export type ThemeModes = 'light' | 'dark';

const mainColors = {
  white: '#fff',
  black: '#000',
  grey: '#A9A9A9',
  red: '#DE4909',
  orange: '#DEBC09',
  yellow: '#FBFF43',
  beige: '#E7D7BE',
  green: '#09DE78',
  green1: '#1B9861',
  green2: '#8DC581',
  pink: '#E9D6EA',
  purple: '#FF35EB',
  blue2: '#3280BB',
  blue3: '#8AA0DF',
  blue: '#326BFF',
  blue4: '#27435C',
  grey1: '#EEEEEE',
  grey2: '#EBEEEF'
};

export const themeModes: Record<ThemeModes, { colors: Colors }> = {
  light: {
    colors: {
      primary: '#000',
      secondary: '#fff',
      tokenTitleLine: '#ffdc24',
      error: '#eb5757',
      proposalPlate: '#F2F3F4',
      docsParagraph: '#222324',
      swap: mainColors.yellow,
      ...mainColors
    }
  },

  dark: {
    colors: {
      primary: '#fff',
      secondary: '#121314',
      tokenTitleLine: '#F3BA2F',
      error: '#eb5757',
      proposalPlate: '#222324',
      docsParagraph: '#D2D3D4',
      swap: mainColors.blue4,
      ...mainColors
    }
  }
};

export const theme = {
  colors: themeModes.light.colors,

  currentTheme: 'light' as 'light' | 'dark',

  mixins: {
    hover: () => '@media (hover: hover)' as const
  },

  breakpoints: {
    xs: () => `@media (min-width: 0px)` as const,
    sm: () => '@media (min-width: 600px)' as const,
    md: () => '@media (min-width: 960px)' as const,
    lg: () => '@media (min-width: 1280px)' as const,
    xl: () => '@media (min-width: 1920px)' as const,
    up: (size: number, dir = 'width') =>
      `@media (min-${dir}: ${size}px)` as '@media (min-{dir}: {size}px)',
    down: (size: number, dir = 'width') =>
      `@media (max-${dir}: ${size}px)` as '@media (max-{dir}: {size}px)'
  }
} as const;

export type Theme = typeof theme;
