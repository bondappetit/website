import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingListStyles = createUseStyles((theme: Theme) => ({
	voting: {
		padding: '48px 16px 104px',

		[theme.breakpoints.md()]: {
			padding: '82px 64px 160px'
		}
	},

	row: {
		display: 'grid',
		gridTemplateColumns: '320px 1fr'
	}
}));
