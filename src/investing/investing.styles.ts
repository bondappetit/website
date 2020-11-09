import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useInvestingStyles = createUseStyles((theme: Theme) => ({
	investing: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'wrap'
	},

	input: {
		width: 58,

		'&:first-child': {
			marginLeft: 10,

			[theme.breakpoints.md()]: {
				marginLeft: 0
			}
		},

		[theme.breakpoints.md()]: {
			width: 115
		}
	},

	userGet: {
		borderBottom: `1px dashed ${theme.colors.primary}`,
		width: 95,
		marginRight: 23,

		[theme.breakpoints.md()]: {
			width: 193,
			marginRight: 0
		}
	},

	button: {
		width: '100%',
		marginTop: 24,

		[theme.breakpoints.md()]: {
			width: 'auto',
			marginTop: 0
		}
	}
}));
