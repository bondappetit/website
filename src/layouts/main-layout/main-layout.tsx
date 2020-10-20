import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import useMainLayoutStyles from './main-layout.styles';

export type MainLayoutProps = {};

const MainLayout: React.FC<MainLayoutProps> = (props) => {
	const classes = useMainLayoutStyles();

	return (
		<>
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						BondAppetit
					</Typography>
					<nav>
						<Link
							variant="button"
							color="textPrimary"
							href="/#"
							className={classes.link}
						>
							Features
						</Link>
						<Link
							variant="button"
							color="textPrimary"
							href="/#"
							className={classes.link}
						>
							Support
						</Link>
					</nav>
					<Button color="primary" variant="outlined" className={classes.link}>
						app
					</Button>
				</Toolbar>
			</AppBar>
			<Container component="main">
				<>{props.children}</>
			</Container>
		</>
	);
};

export default MainLayout;
