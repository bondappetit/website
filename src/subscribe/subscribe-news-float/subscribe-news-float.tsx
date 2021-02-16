import { useToggle } from 'react-use';
import React from 'react';
import clsx from 'clsx';

import { ButtonBase, Portal } from 'src/common';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-24.svg';
import { SubscribeNewsFloatForm } from './subscribe-news-float-form';
import { SubscribeNewsFloatSuccess } from './subscribe-news-float-success';
import { useSubscribeNewsFloatStyles } from './subscribe-news-float.styles';

export type SubscribeNewsFloatProps = {
  onClose: () => void;
};

export const SubscribeNewsFloat: React.VFC<SubscribeNewsFloatProps> = (
  props
) => {
  const classes = useSubscribeNewsFloatStyles();

  const [success, toggleSuccess] = useToggle(false);

  return (
    <Portal>
      <div
        className={clsx(classes.root, {
          [classes.success]: success
        })}
      >
        <ButtonBase
          type="button"
          className={classes.closeButton}
          onClick={props.onClose}
        >
          <CloseIcon />
        </ButtonBase>
        {!success && <SubscribeNewsFloatForm onSuccess={toggleSuccess} />}
        {success && <SubscribeNewsFloatSuccess onClose={props.onClose} />}
      </div>
    </Portal>
  );
};
