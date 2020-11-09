import { createUseStyles } from 'react-jss';
import { transitions } from 'polished';

import { Theme } from '../theme';

export const useLinkStyles = createUseStyles((theme: Theme) => ({
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
		fontWeight: 'normal',
		...transitions('opacity 0.3s ease'),

		[theme.mixins.hover()]: {
			'&:hover': {
				opacity: 0.7
			}
		}
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
