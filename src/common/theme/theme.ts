import EllipseArrowBlack from 'src/assets/images/ellipse-arrow-black.svg';
import EllipseArrowWhite from 'src/assets/images/ellipse-arrow-white.svg';
import EllipseArrowMobileWhite from 'src/assets/images/ellipse-arrow-mobile-white.svg';
import EllipseArrowMobileBlack from 'src/assets/images/ellipse-arrow-mobile-black.svg';
import EllipseArrowMainWhite from 'src/assets/images/ellipse-arrow-main-white.svg';
import EllipseArrowMainBlack from 'src/assets/images/ellipse-arrow-main-black.svg';

export type Colors = {
  primary: string;
  secondary: string;
  error: string;
  tokenTitleLine: string;
  proposalPlate: string;
  grey: string;
  blue: string;
  red: string;
  orange: string;
  beige: string;
  green2: string;
  yellow: string;
  green: string;
  pink: string;
  purple: string;
  darkBlue: string;
  chetwodeBlue: string;
  grey1: string;
  green1: string;
  docsParagraph: string;
  white: string;
  black: string;
  grey2: string;
};

export type ThemeModes = 'light' | 'dark';

const mainColors = {
  white: '#fff',
  black: '#000',
  grey: '#A9A9A9',
  blue: '#326BFF',
  red: '#DE4909',
  orange: '#DEBC09',
  yellow: '#FBFF43',
  beige: '#E7D7BE',
  green: '#09DE78',
  green1: '#1B9861',
  green2: '#8DC581',
  pink: '#E9D6EA',
  purple: '#FF35EB',
  darkBlue: '#3280BB',
  chetwodeBlue: '#8AA0DF',
  grey1: '#EEEEEE',
  grey2: '#EBEEEF'
};

export const themeModes: Record<
  ThemeModes,
  { colors: Colors; images: Record<string, string> }
> = {
  light: {
    colors: {
      primary: '#000',
      secondary: '#fff',
      tokenTitleLine: '#ffdc24',
      error: '#eb5757',
      proposalPlate: '#F2F3F4',
      docsParagraph: '#222324',
      ...mainColors
    },

    images: {
      ellipseDesktop: EllipseArrowBlack,
      ellipseMobile: EllipseArrowMobileBlack,
      ellipseMain: EllipseArrowMainBlack
    }
  },

  dark: {
    colors: {
      primary: '#fff',
      secondary: '#121314',
      tokenTitleLine: '#243aff',
      error: '#eb5757',
      proposalPlate: '#222324',
      docsParagraph: '#D2D3D4',
      ...mainColors
    },

    images: {
      ellipseDesktop: EllipseArrowWhite,
      ellipseMobile: EllipseArrowMobileWhite,
      ellipseMain: EllipseArrowMainWhite
    }
  }
};

export const theme = {
  colors: themeModes.light.colors,

  currentTheme: 'light',

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
  },

  images: themeModes.light.images
} as const;

export type Theme = typeof theme;
