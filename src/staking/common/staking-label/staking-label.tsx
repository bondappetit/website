import React from 'react';

import { Typography, TypographyProps } from 'src/common';

export type StakingLabelProps = {
  className?: string;
  title: string;
  value: React.ReactNode;
  loading: boolean;
  variant?: TypographyProps['variant'];
  align?: TypographyProps['align'];
};

export const StakingLabel: React.FC<StakingLabelProps> = (props) => {
  const { variant = 'h5', align = 'center' } = props;

  return (
    <Typography variant={variant} align={align} className={props.className}>
      {props.title}:{' '}
      <Typography variant="inherit" component="span" weight="bold">
        {props.loading ? '...' : props.value}
      </Typography>
      {props.children}
    </Typography>
  );
};
