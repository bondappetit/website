import { createUseStyles } from 'react-jss';
import { rgba, transitions } from 'polished';

import { Theme } from 'src/common';

export const useWalletListStyles = createUseStyles((theme: Theme) => ({
	wrap: {
		padding: '32px 26px 32px',

		[theme.breakpoints.md()]: {
			padding: 48
		}
	},

	title: {
		marginBottom: 48
	},

	wallet: {
		boxShadow: `0px 0px 0px 1px ${rgba(theme.colors.primary, 0.24)}`,
		borderRadius: 16,
		padding: 12,
		width: '100%',
		justifyContent: 'space-between',
		...transitions('box-shadow 0.3s ease'),

		'&:not(:last-child)': {
			marginBottom: 16
		},

		[theme.mixins.hover()]: {
			'&:hover': {
				opacity: 1,
				boxShadow: `0px 0px 0px 2px ${theme.colors.primary}`
			}
		}
	},

	list: {
		display: 'flex',
		flexDirection: 'column',
		margin: '0 6px',
		width: 279,

		[theme.breakpoints.md()]: {
			margin: '0 64px',
			width: 400
		}
	}
}));
