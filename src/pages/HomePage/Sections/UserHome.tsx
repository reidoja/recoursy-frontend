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
import useFetchDeliveryHistory from '../../../effects/queries/delivery/useFetchDeliveryHistory';
import useFetchRequest from '../../../effects/queries/delivery/useFetchRequest';
import { DeliveryHistory } from '../../../models/Delivery';
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

export default function UserHome({}: Props): ReactElement {
  const classes = useStyles();
  const history = useHistory();

  const { data: dataRequest } = useFetchRequest();
  const { data: dataDelivery } = useFetchDeliveryHistory();

  const [recentDataRequest, setRecentDataRequest] = useState<DeliveryHistory[]>(
    []
  );
  const [recentDataDelivery, setRecentDataDelivery] = useState<
    DeliveryHistory[]
  >([]);

  useEffect(() => {
    if (!dataRequest) return;
    let newArr: DeliveryHistory[] = [];
    if (dataRequest.length > 2) {
      for (let index = 0; index < 3; index++) {
        if (dataRequest[index].details.length < 1) continue;
        newArr.push(dataRequest[index]);
      }
    } else {
      for (let index = 0; index < dataRequest.length; index++) {
        if (dataRequest[index].details.length < 1) continue;
        newArr.push(dataRequest[index]);
      }
    }

    setRecentDataRequest(newArr);
  }, [dataRequest]);

  useEffect(() => {
    if (!dataDelivery) return;
    let newArr: DeliveryHistory[] = [];
    if (dataDelivery.length > 2) {
      for (let index = 0; index < 3; index++) {
        newArr.push(dataDelivery[index]);
      }
    } else {
      for (let index = 0; index < dataDelivery.length; index++) {
        newArr.push(dataDelivery[index]);
      }
    }
    setRecentDataDelivery(newArr);
  }, [dataDelivery]);

  console.log(recentDataRequest);

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
          <Typography variant="h5">Recent Request</Typography>
          <Button onClick={() => history.push('/view-request')} color="primary">
            View More
          </Button>
        </Box>
        <Box width="100%" display="flex">
          {recentDataRequest.map((el, index) => (
            <Box display="flex" key={index} flexGrow="1">
              {el.details.map((el1, idx) => (
                <Card key={idx} className={classes.card}>
                  <CardContent>
                    <Box
                      width="100%"
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start">
                      <Typography>Delivery ID : {el.id}</Typography>
                      <Typography>
                        Date : {formatDateAndTime(el.create_at)}
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
                        <Typography>From : {el.from}</Typography>
                        <Typography>To : {el1.room_destination}</Typography>
                        <Typography>Receiver : {el1.to}</Typography>
                      </Box>
                      <Typography>Status : {el1.status}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
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
          <Typography variant="h5">Recent History</Typography>
          <Button
            onClick={() => history.push('/view-delivery-history')}
            color="primary">
            View More
          </Button>
        </Box>
        <Box width="100%" display="flex">
          {recentDataDelivery.map((el, index) => (
            <Card key={index} className={classes.card}>
              <CardContent>
                <Box width="100%" display="flex" justifyContent="space-between">
                  <Typography>Delivery ID : {el.id}</Typography>
                  <Typography>
                    Date : {formatDateAndTime(el.create_at)}
                  </Typography>
                </Box>
                <Box width="100%" display="flex" justifyContent="space-between">
                  <Typography>From : {el.from}</Typography>
                  <Typography>Total Items : {el.details.length}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
