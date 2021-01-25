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
import React, { ReactElement } from 'react';
import useCancelDelivery from '../../effects/mutations/delivery/useCancelDelivery';
import useFetchRequest from '../../effects/queries/delivery/useFetchRequest';
import formatDateAndTime from '../../utils/formatDateAndTime';

interface Props {}

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
}));

export default function ViewRequestPage({}: Props): ReactElement {
  const classes = useStyles();

  const { data: dataRequest } = useFetchRequest();
  const [
    cancelDelivery,
    {
      isLoading: isDeliveryLoading,
      error: deliveryError,
      status: deliveryStatus,
    },
  ] = useCancelDelivery();

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box width="80%" p={2}>
        <Box display="flex" justifyContent="flex-start" my={2}>
          <Typography variant="h4">View Request</Typography>
        </Box>
        {dataRequest &&
          dataRequest.map((el, idx) => (
            <Box key={idx}>
              {el.details.map((el1, index) => (
                <Card className={classes.card} key={index}>
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
                      flexDirection="row"
                      justifyContent="space-between">
                      <Typography>From : {el.from}</Typography>
                      <Typography>To : {el1.room_destination}</Typography>
                    </Box>
                    <Box
                      py={2}
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between">
                      <Typography>Receiver : {el1.to}</Typography>
                      <Typography>Status : {el1.status}</Typography>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start">
                      <Typography>Item Name : {el1.itemName}</Typography>
                      <Box width="100%" py={1}>
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
                    </Box>
                    <Box width="100%" display="flex" justifyContent="flex-end">
                      <Button
                        onClick={() => {
                          cancelDelivery(el1.id);
                        }}
                        variant="contained"
                        color="secondary"
                        disabled={el1.status === 'delivered' ? true : false}>
                        Cancel
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ))}
      </Box>
    </Box>
  );
}
