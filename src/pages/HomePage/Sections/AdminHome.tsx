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
import { useRecoilValue } from 'recoil';
import useFetchAdminPending from '../../../effects/queries/delivery/useFetchAdminPending';
import useFetchWorkHour from '../../../effects/queries/workhour/useFetchWorkHour';
import {
  DeliveryHistory,
  DeliveryHistoryDetail,
} from '../../../models/Delivery';
import { WorkHour } from '../../../models/Workhour';
import userState from '../../../states/UserState';
import formatDateAndTime from '../../../utils/formatDateAndTime';

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginRight: '8px',
    flexGrow: 1,
  },
  none: {
    display: 'none',
  },
}));

export default function AdminHome({}: Props): ReactElement {
  const classes = useStyles();
  const history = useHistory();

  const { data: dataAdminPending } = useFetchAdminPending();
  const { data: dataWorkHour } = useFetchWorkHour('');

  const [recentAdminPending, setRecentAdminPending] = useState<
    DeliveryHistoryDetail[]
  >([]);
  const [recentWorkHour, setRecentWorkHour] = useState<WorkHour[]>([]);

  useEffect(() => {
    if (!dataAdminPending) return;
    let newArr: DeliveryHistoryDetail[] = [];
    let idx = 0;
    for (let i = 0; i < dataAdminPending.length; i++) {
      for (let j = 0; j < dataAdminPending[i].details.length; j++) {
        if (idx > 2) break;
        newArr.push(dataAdminPending[i].details[j]);
        idx = idx + 1;
      }
    }
    setRecentAdminPending(newArr);
  }, [dataAdminPending]);

  useEffect(() => {
    if (!dataWorkHour) return;
    let newArr: WorkHour[] = [];
    if (dataWorkHour.length > 2) {
      for (let index = 0; index < 3; index++) {
        newArr.push(dataWorkHour[index]);
      }
    } else {
      for (let index = 0; index < dataWorkHour.length; index++) {
        newArr.push(dataWorkHour[index]);
      }
    }
    setRecentWorkHour(newArr);
  }, [dataWorkHour]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        p={2}
        py={4}
        width="80%"
        display="flex"
        flexDirection="column"
        alignItems="center">
        <Box py={2} display="flex" justifyContent="space-between" width="100%">
          <Typography variant="h5">Recent Pending Delivery</Typography>
          <Button
            onClick={() => history.push('/view-delivery-status')}
            color="primary">
            View More
          </Button>
        </Box>
        <Box width="100%" display="flex">
          {recentAdminPending.map((el, index) => (
            <Card key={index} className={classes.card}>
              <CardContent>
                <Box
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start">
                  <Typography>Delivery ID : {el.id}</Typography>
                  <Typography>
                    Date : {formatDateAndTime(el.created_at)}
                  </Typography>
                </Box>
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center">
                  <Box
                    py={2}
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start">
                    <Typography>To : {el.room_destination}</Typography>
                    <Typography>Receiver : {el.to}</Typography>
                  </Box>
                  <Typography>Status : {el.status}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      <Box
        py={4}
        p={2}
        width="80%"
        display="flex"
        flexDirection="column"
        alignItems="center">
        <Box py={2} display="flex" justifyContent="space-between" width="100%">
          <Typography variant="h5">Recent Work Hour</Typography>
          <Button
            onClick={() => history.push('/set-working-hour')}
            color="primary">
            View More
          </Button>
        </Box>
        <Box width="100%" display="flex">
          {recentWorkHour.map((el, index) => (
            <Card key={index} className={classes.card}>
              <CardContent>
                <Box width="100%" display="flex" justifyContent="space-between">
                  <Typography>From : {el.from}</Typography>
                  <Typography>To : {el.to}</Typography>
                </Box>
                <Box
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start">
                  <Typography>Note :</Typography>
                  <Typography>{el.note} </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
