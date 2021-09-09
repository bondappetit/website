import clsx from 'clsx';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Link, Typography, numberArray } from 'src/common';
import { URLS } from 'src/router/urls';
import { MainWindow } from '../main-window/main-window';
import { useMainEditorStyles } from './main-editor.styles';

export type MainEditorProps = {
  className?: string;
};

export const MainEditor: React.FC<MainEditorProps> = (props) => {
  const classes = useMainEditorStyles();

  return (
    <>
      <Typography variant="h2" className={classes.title}>
        BondAppetit is powered by robust and secure technology
      </Typography>
      <div className={clsx(classes.root, props.className)}>
        <MainWindow className={classes.window}>
          <div className={classes.wrap}>
            <Typography variant="h4" className={classes.numbers}>
              {numberArray(11).map((num) => (
                <div key={num}>{num + 1}</div>
              ))}
            </Typography>
            <div>
              <Typography variant="h4" component="div">
                <Typography variant="inherit" weight="semibold">
                  Technology
                </Typography>{' '}
                (docs) {'{'}
              </Typography>
              <Typography variant="h4" className={classes.text} component="div">
                While cooking the delicious technical stuffing of BondAppetit,
                we were inspired by a great work of developers from Compound,
                MakerDAO, Uniswap, and other protocols based on the Ethereum
                blockchain.
              </Typography>
              <Typography variant="h4" component="div">
                {'}'}
              </Typography>
              <Typography
                variant="h4"
                component="div"
                className={classes.space}
              >
                &nbsp;
              </Typography>
              <Typography variant="h4">
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link
                  color="blue"
                  component={ReactRouterLink}
                  to={URLS.docs.list}
                >
                  Read our docs
                </Link>
              </Typography>
            </div>
          </div>
        </MainWindow>
        {props.children}
      </div>
    </>
  );
};
