import { Theme } from 'src/common';

export const errorBoundaryStyles = (theme: Theme) => ({
  errorBoundary: {
    background: theme.colors.secondary,
    color: theme.colors.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  }
});
