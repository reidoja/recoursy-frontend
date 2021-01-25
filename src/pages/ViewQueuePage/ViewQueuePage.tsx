import {
  Box,
  Card,
  CardContent,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import useFetchQueue from '../../effects/queries/delivery/useFetchQueue';
import formatDateAndTime from '../../utils/formatDateAndTime';

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginBottom: '24px',
  },
}));

export default function ViewQueuePage({}: Props): ReactElement {
  const { data: dataQueue } = useFetchQueue();
  const classes = useStyles();

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box width="80%" p={2}>
        <Box display="flex" justifyContent="flex-start" my={2}>
          <Typography variant="h4">View Queue</Typography>
        </Box>
        {dataQueue &&
          dataQueue.map((el, index) => (
            <Card className={classes.card} key={index}>
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Delivery Id : {el.delivery_id}</Typography>
                  <Typography>
                    Date : {formatDateAndTime(el.created_at)}
                  </Typography>
                </Box>
                <Box
                  py={2}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between">
                  <Typography>To : {el.room_destination}</Typography>
                </Box>
                <Box
                  py={2}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between">
                  <Typography>Receiver : {el.to}</Typography>
                  <Typography>Status : {el.status}</Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start">
                  <Typography>Item Name : {el.itemName}</Typography>
                  <Box width="100%" py={1}>
                    <TextField
                      label="Note"
                      fullWidth
                      multiline
                      variant="outlined"
                      color="primary"
                      size="small"
                      value={el.itemNote}
                      disabled
                      InputProps={{
                        rows: 2,
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
      </Box>
    </Box>
  );
}
