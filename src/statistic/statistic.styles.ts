import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStatisticStyles = createUseStyles<Theme>((theme) => ({
	row: {
		marginTop: 64,
		display: 'grid',
		gridGap: 48,

		[theme.breakpoints.md()]: {
			gridTemplateColumns: '1fr 1fr'
		}
	},

	rightCard: {
		maxWidth: 396
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

	count: {
		fontSize: 64,
		lineHeight: '72px',

		[theme.breakpoints.sm()]: {
			fontSize: 70,
			lineHeight: '72px',

			'& br': {
				display: 'block'
			}
		},

		[theme.breakpoints.md()]: {
			fontSize: 80,
			lineHeight: '82px'
		},

		[theme.breakpoints.lg()]: {
			fontSize: 104,
			lineHeight: '112px'
		}
	}
}));
