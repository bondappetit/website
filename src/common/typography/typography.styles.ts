import { createUseStyles } from 'react-jss';

import { Theme } from '../theme';

export const useTypographyStyles = createUseStyles<Theme>((theme) => ({
	typography: {
		margin: 0,
		fontFamily: 'inherit',
		color: 'currentColor',
		letterSpacing: '-0.02em',
		fontWeight: 'normal'
	},

	h1: {
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

	h2: {
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

	h3: {
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

	h4: {
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

	h5: {
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

	body1: {
		fontSize: 16,
		lineHeight: '20px'
	},

	body2: {
		fontSize: 14,
		lineHeight: '20px'
	},

	light: {
		fontWeight: 400
	},

	bold: {
		fontWeight: 700
	},

	left: {
		textAlign: 'left'
	},

	center: {
		textAlign: 'center'
	},

	right: {
		textAlign: 'right'
	}
}));
