import { useToggle } from 'react-use';
import React from 'react';
import clsx from 'clsx';

import { ButtonBase, Portal } from 'src/common';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-24.svg';
import { ContactsNewsFloatForm } from './contacts-news-float-form';
import { ContactsNewsFloatSuccess } from './contacts-news-float-success';
import { useContactsNewsFloatStyles } from './contacts-news-float.styles';

export type ContactsNewsFloatProps = {
  onClose: () => void;
};

export const ContactsNewsFloat: React.VFC<ContactsNewsFloatProps> = (props) => {
  const classes = useContactsNewsFloatStyles();

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
        {!success && <ContactsNewsFloatForm onSuccess={toggleSuccess} />}
        {success && <ContactsNewsFloatSuccess onClose={props.onClose} />}
      </div>
    </Portal>
  );
};
