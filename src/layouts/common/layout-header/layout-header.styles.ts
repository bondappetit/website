import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useLayoutHeaderStyles = createUseStyles((theme: Theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0 16px',

		[theme.breakpoints.md()]: {
			padding: '12px 32px'
		}
	}
}));
