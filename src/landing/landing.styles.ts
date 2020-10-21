import { makeStyles } from '@material-ui/core/styles';

export const useLandingStyles = makeStyles((theme) => ({
	wrap: {
		marginTop: theme.spacing(2)
	},

	grid: {
		marginTop: theme.spacing(2)
	},

	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700]
	},

	cardPricing: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'baseline',
		marginBottom: theme.spacing(2)
	}
}));
