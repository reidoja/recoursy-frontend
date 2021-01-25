import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import useFetchDeliveryHistory from '../../effects/queries/delivery/useFetchDeliveryHistory';
import useFetchRequest from '../../effects/queries/delivery/useFetchRequest';
import { DeliveryHistory } from '../../models/Delivery';
import userState from '../../states/UserState';
import formatDateAndTime from '../../utils/formatDateAndTime';
import AdminHome from './Sections/AdminHome';
import UserHome from './Sections/UserHome';

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: '33%',
    marginRight: '8px',
  },
  none: {
    display: 'none',
  },
}));

export default function HomePage({}: Props): ReactElement {
  const user = useRecoilValue(userState);

  return <>{user?.user.role === 'user' ? <UserHome /> : <AdminHome />}</>;
}
