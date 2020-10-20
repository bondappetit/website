import { makeStyles } from '@material-ui/core/styles';

const useMainLayoutStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`
	},

	toolbar: {
		flexWrap: 'wrap'
	},

	toolbarTitle: {
		flexGrow: 1
	},

	link: {
		margin: theme.spacing(1, 1.5)
	},

	heroContent: {
		padding: theme.spacing(8, 0, 6)
	}
}));

export default useMainLayoutStyles;
