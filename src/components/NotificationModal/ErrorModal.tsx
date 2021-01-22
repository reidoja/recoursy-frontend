import React, { ReactElement } from 'react';
import NotificationModal, { NotificationModalProps } from './NotificationModal';
import ErrorIcon from '@material-ui/icons/Error';
import getErrorResponse from '../../utils/getErrorResponse';

interface Props
  extends Omit<
    Omit<Omit<Omit<NotificationModalProps, 'icon'>, 'title'>, 'desc'>,
    'buttonText'
  > {
  title?: string;
  error?: any;
  desc?: string;
  buttonText?: string;
}

export default function ErrorModal({
  title = 'Error',
  desc = '',
  error,
  buttonText = 'OK',
  ...otherProps
}: Props): ReactElement {
  return (
    <NotificationModal
      buttonText={buttonText}
      icon={<ErrorIcon color="error" />}
      title={title}
      desc={error ? getErrorResponse(error)?.message : desc}
      {...otherProps}
    />
  );
}
