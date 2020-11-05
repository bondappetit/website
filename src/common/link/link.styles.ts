import { createUseStyles } from 'react-jss';
import { Theme } from '../theme';

export const useLinkStyles = createUseStyles<Theme>((theme) => ({
	link: {
		display: 'inline-flex',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		cursor: 'pointer',
		padding: 0,
		margin: 0,
		border: 0,
		backgroundColor: 'transparent',
		outline: 0,
		fontFamily: 'inherit',
		color: 'currentColor',
		letterSpacing: '-0.02em',
		fontWeight: 'normal'
	},

	none: {
		textDecoration: 'none'
	},

	always: {
		textDecoration: 'underline'
	},

	hover: {
		textDecoration: 'none',

		[theme.mixins.hover()]: {
			'&:hover': {
				textDecoration: 'underline'
			}
		}
	}
}));
