import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import SelectInput from '../../components/SelectInput/SelectInput';
import useFetchAdminPending from '../../effects/queries/delivery/useFetchAdminPending';
import useFetchAdminDelivered from '../../effects/queries/delivery/useFetchAdminDelivered';
import formatDateAndTime from '../../utils/formatDateAndTime';
import { DeliveryHistory } from '../../models/Delivery';
import useUpdateStatusDelivery from '../../effects/mutations/delivery/useUpdateStatusDelivery';
import FullScreenLoading from '../../components/FullScreenLoading/FullScreenLoading';
import ErrorModal from '../../components/NotificationModal/ErrorModal';
import SuccessModal from '../../components/NotificationModal/SuccessModal';

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    width: '100%',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    borderBottom: '1px solid rgba(50, 50, 50, 0.2)',
  },
  card: {
    marginBottom: '24px',
  },
  none: {
    display: 'none',
  },
}));

interface Props {}

export default function ViewDeliveryStatusPage({}: Props): ReactElement {
  const classes = useStyles();

  const { data: dataAdminPending } = useFetchAdminPending();
  const { data: dataAdminDelivered } = useFetchAdminDelivered();

  const [adminPendingState, setAdminPendingState] = useState<DeliveryHistory[]>(
    []
  );
  const [adminDeliveredState, setAdminDeliveredState] = useState<
    DeliveryHistory[]
  >([]);

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const [
    updateStatusDelivery,
    {
      isLoading: isDeliveryLoading,
      error: deliveryError,
      status: deliveryStatus,
    },
  ] = useUpdateStatusDelivery();

  useEffect(() => {
    if (!dataAdminPending) return;
    const newData: DeliveryHistory[] = [];
    dataAdminPending.map((el, index) => {
      newData.push(el);
    });
    setAdminPendingState(newData);
  }, [dataAdminPending]);

  useEffect(() => {
    if (!dataAdminDelivered) return;
    const newData: DeliveryHistory[] = [];
    dataAdminDelivered.map((el, index) => {
      newData.push(el);
    });
    setAdminDeliveredState(newData);
  }, [dataAdminDelivered]);

  useEffect(() => {
    if (deliveryError) {
      setOpenError(true);
    } else if (deliveryStatus === 'success') {
      setOpenSuccess(true);
    }
  }, [deliveryError, deliveryStatus]);

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <FullScreenLoading open={isDeliveryLoading} />
      <ErrorModal
        error={deliveryError}
        onButtonClickOrClose={() => setOpenError(false)}
        open={openError}
      />
      <SuccessModal
        desc="Update Success"
        open={openSuccess}
        onButtonClickOrClose={() => {
          setOpenSuccess(false);
        }}
      />
      <Box width="100%" p={2}>
        <Box display="flex" justifyContent="flex-start" my={2}>
          <Box width="50%">
            <Typography variant="h4">View Pending Request</Typography>
          </Box>
          <Box width="50%">
            <Typography variant="h4">View Delivered Request</Typography>
          </Box>
        </Box>
        <Box width="100%" display="flex">
          <Box width="50%" p={2}>
            {adminPendingState &&
              Object.values(adminPendingState).map((el, index) => (
                <Card
                  className={
                    el.details.length < 1 ? classes.none : classes.card
                  }
                  key={index}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>Delivery Id : {el.id}</Typography>
                      <Typography>
                        Date : {formatDateAndTime(el.create_at)}
                      </Typography>
                    </Box>
                    <Box
                      py={2}
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start">
                      <Typography>From : {el.from}</Typography>
                    </Box>
                    <Box borderBottom="1px solid" />
                    <List className={classes.list}>
                      {el.details.map((el1, idx) => (
                        <ListItem className={classes.listItem} key={idx}>
                          <Box display="flex" width="100%">
                            <Typography>Item Name : {el1.itemName}</Typography>
                          </Box>
                          <Box
                            width="100%"
                            py={2}
                            display="flex"
                            justifyContent="space-between">
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="flex-start">
                              <Typography>
                                To : {el1.room_destination}
                              </Typography>
                              <Typography>Receiver : {el1.to}</Typography>
                            </Box>
                            <Box
                              display="flex"
                              flexDirection="column"
                              justifyContent="flex-end"
                              width="163.2px"
                              pt={1}>
                              <SelectInput
                                label="Status"
                                value={el1.status}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setAdminPendingState((prev) => {
                                    const newState = [...prev];
                                    newState[index].details[idx].status = value;
                                    return newState;
                                  });
                                }}
                                options={[
                                  { value: 'completed', text: 'Completed' },
                                  { value: 'delivered', text: 'Delivered' },
                                  { value: 'pending', text: 'Pending' },
                                ]}
                              />
                            </Box>
                          </Box>
                          <Box py={2} width="100%">
                            <TextField
                              label="Note"
                              fullWidth
                              multiline
                              variant="outlined"
                              color="primary"
                              size="small"
                              value={el1.itemNote}
                              disabled
                              InputProps={{
                                rows: 2,
                              }}
                            />
                          </Box>
                          <Box
                            width="100%"
                            display="flex"
                            justifyContent="flex-end">
                            <Button
                              onClick={() => {
                                const data = {
                                  id: el1.id,
                                  status: el1.status,
                                };
                                updateStatusDelivery(data);
                              }}
                              variant="contained"
                              color="primary">
                              Update
                            </Button>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              ))}
          </Box>
          <Box width="50%" p={2}>
            {adminDeliveredState &&
              Object.values(adminDeliveredState).map((el, index) => (
                <Card
                  className={
                    el.details.length < 1 ? classes.none : classes.card
                  }
                  key={index}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>Delivery Id : {el.id}</Typography>
                      <Typography>
                        Date : {formatDateAndTime(el.create_at)}
                      </Typography>
                    </Box>
                    <Box
                      py={2}
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start">
                      <Typography>From : {el.from}</Typography>
                    </Box>
                    <Box borderBottom="1px solid" />
                    <List className={classes.list}>
                      {el.details.map((el1, idx) => (
                        <ListItem className={classes.listItem} key={idx}>
                          <Box display="flex" width="100%">
                            <Typography>Item Name : {el1.itemName}</Typography>
                          </Box>
                          <Box
                            width="100%"
                            py={2}
                            display="flex"
                            justifyContent="space-between">
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="flex-start">
                              <Typography>
                                To : {el1.room_destination}
                              </Typography>
                              <Typography>Receiver : {el1.to}</Typography>
                            </Box>
                            <Box
                              display="flex"
                              flexDirection="column"
                              justifyContent="flex-end"
                              width="163.2px"
                              pt={1}>
                              <SelectInput
                                label="Status"
                                value={el1.status}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setAdminDeliveredState((prev) => {
                                    const newState = [...prev];
                                    newState[index].details[idx].status = value;
                                    return newState;
                                  });
                                }}
                                options={[
                                  { value: 'completed', text: 'Completed' },
                                  { value: 'delivered', text: 'Delivered' },
                                ]}
                              />
                            </Box>
                          </Box>
                          <Box py={2} width="100%">
                            <TextField
                              label="Note"
                              fullWidth
                              multiline
                              variant="outlined"
                              color="primary"
                              size="small"
                              value={el1.itemNote}
                              disabled
                              InputProps={{
                                rows: 2,
                              }}
                            />
                          </Box>
                          <Box
                            width="100%"
                            display="flex"
                            justifyContent="flex-end">
                            <Button
                              onClick={() => {
                                const data = {
                                  id: el1.id,
                                  status: el1.status,
                                };
                                updateStatusDelivery(data);
                              }}
                              variant="contained"
                              color="primary">
                              Update
                            </Button>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
