import React, { ReactElement } from 'react';
import NotificationModal, { NotificationModalProps } from './NotificationModal';
import CheckIcon from '@material-ui/icons/Check';

interface Props
  extends Omit<
    Omit<Omit<NotificationModalProps, 'icon'>, 'title'>,
    'buttonText'
  > {
  title?: string;
  buttonText?: string;
}

export default function SuccessModal({
  title = 'Success',
  buttonText = 'OK',
  ...otherProps
}: Props): ReactElement {
  return (
    <NotificationModal
      buttonText={buttonText}
      icon={<CheckIcon color="primary" />}
      title={title}
      {...otherProps}
    />
  );
}
