import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

export const useInvestFormStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		flexWrap: 'wrap',
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4)
	},

	input: {
		width: '100%',
		marginBottom: theme.spacing(1)
	},

	buttonWrapper: {
		margin: theme.spacing(1),
		position: 'relative'
	},

	buttonProgress: {
		color: green[500],
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12
	}
}));
