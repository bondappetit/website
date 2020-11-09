import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStatisticStyles = createUseStyles((theme: Theme) => ({
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
	},

	decoratedText: {
		position: 'relative',
		zIndex: 1,
		whiteSpace: 'nowrap'
	},

	textRound: {
		position: 'absolute',
		top: -5,
		left: -5,
		right: -5,
		bottom: 0,
		zIndex: -1,

		[theme.breakpoints.md()]: {
			top: -8,
			left: -8,
			right: -8
		}
	},

	textUnderline: {
		position: 'absolute',
		left: 0,
		bottom: -3,
		right: 0,
		zIndex: -1,
		width: '100%',
		height: 3,

		[theme.breakpoints.md()]: {
			bottom: -5
		}
	},

	textDoubleUnderline: {
		height: 'auto'
	},

	tokenTitleLine: {
		stroke: theme.colors.tokenTitleLine,
		position: 'absolute',
		width: '100%',
		top: 0,
		bottom: 0,
		left: 0,
		zIndex: -1
	}
}));
