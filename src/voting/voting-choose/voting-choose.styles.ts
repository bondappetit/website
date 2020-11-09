import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingChooseStyles = createUseStyles((theme: Theme) => ({
	votingChoose: {
		display: 'flex',
		flexDirection: 'column',
		padding: '16px',
		width: 400,
		height: 400,

		[theme.breakpoints.md()]: {
			padding: '16px'
		}
	}
}));
