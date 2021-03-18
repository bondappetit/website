import React from 'react';

import { ButtonBase, Link, Plate, Typography } from 'src/common';
import { useMainWavesCardStyles } from './main-waves-card.styles';

export type MainWavesCardProps = {
  title: string;
  text: string;
  link: string;
  linkLabel: string;
  icon: React.FC<{ className?: string }>;
  onClick?: () => void;
};

export const MainWavesCard: React.VFC<MainWavesCardProps> = (props) => {
  const classes = useMainWavesCardStyles();

  const LinkComponent = props.link ? Link : 'div';

  return (
    <Plate
      onClick={props.onClick}
      component={props.onClick ? ButtonBase : undefined}
      withoutBorder
      color="grey"
      className={classes.root}
    >
      <props.icon className={classes.icon} />
      <Typography variant="h4" weight="bold">
        {props.title}
      </Typography>
      <Typography variant="h4" component="div" className={classes.text}>
        {props.text}
      </Typography>
      <Typography variant="body1" component="div" className={classes.link}>
        <LinkComponent
          href={props.link ? props.link : undefined}
          className={classes.linkContent}
          target={props.link ? '_blank' : undefined}
        >
          {props.linkLabel}
        </LinkComponent>
      </Typography>
    </Plate>
  );
};
