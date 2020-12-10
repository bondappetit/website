import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useVotingProposalDescriptionStyles = createUseStyles(
  (theme: Theme) => ({
    description: {
      maxWidth: 560,
      margin: '0 auto 60px'
    },

    skeletonWrap: {
      '&:not(:last-child)': {
        marginBottom: 32
      },

      '& *': {
        marginBottom: 8
      }
    },

    markdown: {
      '& *': {
        margin: '0 0 16px',
        fontFamily: 'inherit',
        color: 'currentColor',
        letterSpacing: '-0.02em'
      },

      '& a': {
        color: theme.colors.darkBlue,
        textDecoration: 'none'
      },

      '& h1': {
        fontSize: 34,
        lineHeight: '40px',

        [theme.breakpoints.md()]: {
          fontSize: 50,
          lineHeight: '58px'
        },

        [theme.breakpoints.lg()]: {
          fontSize: 80,
          lineHeight: '88px'
        }
      },

      '& h2': {
        fontSize: 20,
        lineHeight: '28px',

        [theme.breakpoints.md()]: {
          fontSize: 30,
          lineHeight: '38px'
        },

        [theme.breakpoints.lg()]: {
          fontSize: 40,
          lineHeight: '48px'
        }
      },

      '& h3': {
        fontSize: 20,
        lineHeight: '28px',

        [theme.breakpoints.md()]: {
          fontSize: 26,
          lineHeight: '34px'
        },

        [theme.breakpoints.lg()]: {
          fontSize: 32,
          lineHeight: '40px'
        }
      },

      '& h4': {
        fontSize: 16,
        lineHeight: '24px',

        [theme.breakpoints.md()]: {
          fontSize: 18,
          lineHeight: '26px'
        },

        [theme.breakpoints.lg()]: {
          fontSize: 24,
          lineHeight: '32px'
        }
      },

      '& h5': {
        fontSize: 14,
        lineHeight: '20px',

        [theme.breakpoints.md()]: {
          fontSize: 16,
          lineHeight: '20px'
        },

        [theme.breakpoints.lg()]: {
          fontSize: 20,
          lineHeight: '28px'
        }
      },

      '& p': {
        fontSize: 16,
        lineHeight: '20px'
      }
    }
  }),
  {
    name: 'VotingDetailsBlock'
  }
);
