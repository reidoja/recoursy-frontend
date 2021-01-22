import {
  Box,
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
import useFetchDeliveryHistory from '../../effects/queries/delivery/useFetchDeliveryHistory';
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
  none: {
    display: 'none',
  },
}));

export default function ViewDeliveryHistoryPage({}: Props): ReactElement {
  const classes = useStyles();

  const { data: dataDelivery } = useFetchDeliveryHistory();

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box width="80%" p={2}>
        <Box display="flex" justifyContent="flex-start" my={2}>
          <Typography variant="h4">View Delivery History</Typography>
        </Box>
        {dataDelivery &&
          dataDelivery.map((el, index) => (
            <Card
              className={el.details.length < 1 ? classes.none : classes.card}
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
                  {el.details.map((el1, index) => (
                    <ListItem className={classes.listItem} key={index}>
                      <Box
                        display="flex"
                        width="100%"
                        justifyContent="space-between">
                        <Typography>Item Name : {el1.itemName}</Typography>
                        <Typography>Status : {el1.status}</Typography>
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
                          <Typography>To : {el1.to}</Typography>
                          <Typography>Receiver : {el1.to}</Typography>
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
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))}
        {/* {data.map((el, index) => (
          
        ))} */}
      </Box>
    </Box>
  );
}
