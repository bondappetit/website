import { makeStyles } from '@material-ui/core/styles';

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
	}
}));
