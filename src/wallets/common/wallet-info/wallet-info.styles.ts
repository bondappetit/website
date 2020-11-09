import { createUseStyles } from 'react-jss';
import { rgba, transitions } from 'polished';

import { Theme } from 'src/common';

export const useWalletInfoStyles = createUseStyles((theme: Theme) => ({
	wrap: {
		padding: 16,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		width: 343,
		height: 408,

		[theme.breakpoints.md()]: {
			padding: 24,
			width: 632,
			height: 560
		}
	},

	button: {
		marginLeft: 'auto',
		boxShadow: `0px 0px 0px 1px ${rgba(theme.colors.primary, 0.24)}`,
		borderRadius: 8,
		padding: '4px 23px',
		...transitions('box-shadow 0.3s ease'),

		[theme.mixins.hover()]: {
			'&:hover': {
				opacity: 1,
				boxShadow: `0px 0px 0px 2px ${theme.colors.primary}`
			}
		}
	},

	subtitle: {
		opacity: 0.4
	},

	header: {
		display: 'flex'
	},

	link: {
		marginBottom: 8,

		[theme.breakpoints.md()]: {
			marginBottom: 24
		}
	}
}));
