import { createUseStyles } from 'react-jss';

import { Theme } from '../theme';

export const useSkeletonStyles = createUseStyles((theme: Theme) => ({
	root: {
		display: 'block',
		backgroundColor: theme.colors.primary,
		height: '1.2em'
	},

	text: {
		marginTop: 0,
		marginBottom: 0,
		height: 'auto',
		transformOrigin: '0 55%',
		transform: 'scale(1, 0.60)',
		borderRadius: `10px/${Math.round((10 / 0.6) * 10) / 10}px`,

		'&:empty:before': {
			content: '"\\00a0"'
		}
	},

	rectangular: {},

	circular: {
		borderRadius: '50%'
	},

	pulse: {
		animation: '$pulse 1.5s ease-in-out 0.5s infinite'
	},
	'@keyframes pulse': {
		'0%': {
			opacity: 1
		},

		'50%': {
			opacity: 0.4
		},

		'100%': {
			opacity: 1
		}
	},

	wave: {
		position: 'relative',
		overflow: 'hidden',

		'&::after': {
			animation: '$wave 1.6s linear 0.5s infinite',
			background: `linear-gradient(90deg, transparent, ${theme.colors.primary}, transparent)`,
			content: '""',
			position: 'absolute',
			transform: 'translateX(-100%)',
			bottom: 0,
			left: 0,
			right: 0,
			top: 0
		}
	},
	'@keyframes wave': {
		'0%': {
			transform: 'translateX(-100%)'
		},

		'60%': {
			transform: 'translateX(100%)'
		},

		'100%': {
			transform: 'translateX(100%)'
		}
	},

	withChildren: {
		'& > *': {
			visibility: 'hidden'
		}
	},

	fitContent: {
		maxWidth: 'fit-content'
	},

	heightAuto: {
		height: 'auto'
	}
}));
