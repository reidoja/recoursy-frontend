import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import userState from '../../states/UserState';

interface Props {}

const dataRequest = [
  {
    delivery_id: '12345',
    date: 'Jan 16 2020',
    from: '1305',
    to: '1402',
    receiver: 'asd@gmail.com',
    status: 'Pending',
  },
  {
    delivery_id: '12345',
    date: 'Jan 16 2020',
    from: '1305',
    to: '1402',
    receiver: 'asd@gmail.com',
    status: 'Pending',
  },
  {
    delivery_id: '12345',
    date: 'Jan 16 2020',
    from: '1305',
    to: '1402',
    receiver: 'asd@gmail.com',
    status: 'Pending',
  },
];

const dataWorkHour = [{ from: '15:00', to: '16:00', note: 'asdasd' }];

const dataHistory = [
  {
    delivery_id: '12345',
    date: 'Jan 16 2020',
    from: '1305',
    totalItems: '3',
  },
  {
    delivery_id: '12345',
    date: 'Jan 16 2020',
    from: '1305',
    totalItems: '3',
  },
  {
    delivery_id: '12345',
    date: 'Jan 16 2020',
    from: '1305',
    totalItems: '3',
  },
];

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
  const classes = useStyles();
  const history = useHistory();

  const [user, setUser] = useRecoilState(userState);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        className={user?.user.role === 'admin' ? classes.none : ''}>
        <Box
          p={2}
          py={4}
          width="80%"
          display="flex"
          flexDirection="column"
          alignItems="center">
          <Box
            py={2}
            display="flex"
            justifyContent="space-between"
            width="100%">
            <Typography variant="h5">Recent Request</Typography>
            <Button
              onClick={() => history.push('/view-request')}
              color="primary">
              View More
            </Button>
          </Box>
          <Box width="100%" display="flex">
            {dataRequest.map((el, index) => (
              <Card key={index} className={classes.card}>
                <CardContent>
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="space-between">
                    <Typography>Delivery ID : {el.delivery_id}</Typography>
                    <Typography>Date : {el.date}</Typography>
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
                      <Typography>From : {el.from}</Typography>
                      <Typography>To : {el.to}</Typography>
                      <Typography>Receiver : {el.receiver}</Typography>
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
          <Box
            py={2}
            display="flex"
            justifyContent="space-between"
            width="100%">
            <Typography variant="h5">Recent History</Typography>
            <Button
              onClick={() => history.push('/view-delivery-history')}
              color="primary">
              View More
            </Button>
          </Box>
          <Box width="100%" display="flex">
            {dataHistory.map((el, index) => (
              <Card key={index} className={classes.card}>
                <CardContent>
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="space-between">
                    <Typography>Delivery ID : {el.delivery_id}</Typography>
                    <Typography>Date : {el.date}</Typography>
                  </Box>
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="space-between">
                    <Typography>From : {el.from}</Typography>
                    <Typography>Total Items : {el.totalItems}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
