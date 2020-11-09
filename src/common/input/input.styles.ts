import { createUseStyles } from 'react-jss';

import { Theme } from '../theme';

export const useInputStyles = createUseStyles<Theme>((theme) => ({
	root: {
		position: 'relative',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		display: 'inline-flex',
		height: 24,
		marginTop: 17,

		[theme.breakpoints.md()]: {
			height: 48
		}
	},

	input: {
		display: 'inherit',
		backgroundColor: 'transparent',
		border: 0,
		outline: 0,
		fontFamily: 'inherit',
		color: theme.colors.primary,
		padding: 0,
		letterSpacing: '-0.02em',
		width: '100%',
		height: 'inherit',
		textOverflow: 'inherit',
		fontSize: 20,
		lineHeight: '24px',

		'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
			'-webkit-appearance': 'none',
			margin: 0
		},

		[theme.breakpoints.md()]: {
			fontSize: 40,
			lineHeight: '48px'
		}
	},

	disabled: {
		pointerEvents: 'none',
		opacity: 0.6
	},

	readOnly: {
		pointerEvents: 'none'
	},

	labelWrap: {
		display: 'inherit',
		textOverflow: 'inherit'
	},

	label: {
		position: 'absolute',
		letterSpacing: '-0.02em',
		textOverflow: 'inherit',
		overflow: 'hidden',
		width: '100%',
		pointerEvents: 'none',
		height: 'inherit',
		transition: 'transform 300ms ease',
		transform: 'translateY(0) scale(1)',
		transformOrigin: 'top left',
		fontSize: 20,
		lineHeight: '24px',

		[theme.breakpoints.md()]: {
			fontSize: 40,
			lineHeight: '48px'
		}
	},

	focus: {
		textOverflow: 'initial',
		overflow: 'visible',
		transform: 'translateY(-17px) scale(0.55)',

		[theme.breakpoints.md()]: {
			transform: 'translateY(-17px) scale(0.35)'
		}
	},

	error: {
		color: theme.colors.error
	}
}));
