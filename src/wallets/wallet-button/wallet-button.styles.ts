import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useWalletButtonStyles = createUseStyles((theme: Theme) => ({
	wrap: {
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		width: 40,

		[theme.breakpoints.md()]: {
			'&:hover $label': {
				opacity: 0.4
			}
		}
	},

	label: {
		opacity: 0,
		right: 'calc(100% + 10px)',
		transition: 'opacity .3s ease',
		position: 'absolute',
		display: 'none',
		whiteSpace: 'nowrap',

		[theme.breakpoints.md()]: {
			display: 'block'
		}
	},

	account: {
		right: 'calc(100% + 10px)',
		position: 'absolute',
		display: 'none',

		[theme.breakpoints.md()]: {
			display: 'block'
		}
	}
}));
