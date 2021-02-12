import { createUseStyles } from 'react-jss';
import { Theme } from '../theme';

export const useSuspenseFallbackStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: theme.colors.secondary,
      color: theme.colors.primary
    }
  }),
  {
    name: 'SuspenseFallback'
  }
);
