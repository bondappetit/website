import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useLayoutWrapperStyles = createUseStyles<Theme>((theme) => ({
	root: {
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: theme.colors.secondary,
		color: theme.colors.primary
	}
}));
