import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useHomeStyles = createUseStyles<Theme>((theme) => ({
	home: {
		padding: '48px 16px 104px',

		[theme.breakpoints.md()]: {
			padding: '82px 64px 160px'
		}
	},

	title: {
		'& br': {
			display: 'none'
		},

		[theme.breakpoints.md()]: {
			'& br': {
				display: 'block'
			}
		}
	},

	investing: {
		margin: '56px auto 0',

		[theme.breakpoints.md()]: {
			maxWidth: 756,
			margin: '96px auto 122px'
		}
	},

	announcement: {
		margin: '56px auto 0',

		[theme.breakpoints.md()]: {
			margin: '96px auto 122px'
		}
	},

	button: {
		display: 'none',
		justifyContent: 'center',
		marginBottom: 145,

		[theme.breakpoints.md()]: {
			display: 'flex'
		}
	},

	statistic: {
		marginTop: 160,

		[theme.breakpoints.md()]: {
			marginTop: 0
		}
	},

	documents: {
		marginTop: 136,

		[theme.breakpoints.md()]: {
			marginTop: 200
		}
	}
}));
