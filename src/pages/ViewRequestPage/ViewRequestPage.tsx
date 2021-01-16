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

const data = [
  {
    delivery_id: '12345',
    date: 'Jan 16 2020',
    from: '1305',
    item_name: 'Surat Peringatan',
    to: '1405',
    receiver: 'asd@gmail.com',
    status: 'Pending',
    note: 'Berkas warna coklat, tali merah',
  },
  {
    delivery_id: '12345',
    date: 'Jan 16 2020',
    from: '1305',
    item_name: 'Surat Peringatan',
    to: '1405',
    receiver: 'asd@gmail.com',
    status: 'Pending',
    note: 'Berkas warna coklat, tali merah',
  },
  {
    delivery_id: '12345',
    date: 'Jan 16 2020',
    from: '1305',
    item_name: 'Surat Peringatan',
    to: '1405',
    receiver: 'asd@gmail.com',
    status: 'Pending',
    note: 'Berkas warna coklat, tali merah',
  },
];

export default function ViewRequestPage({}: Props): ReactElement {
  const classes = useStyles();

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box width="80%" p={2}>
        <Box display="flex" justifyContent="flex-start" my={2}>
          <Typography variant="h4">View Request</Typography>
        </Box>
        {data.map((el, index) => (
          <Card className={classes.card} key={index}>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Typography>Delivery Id : {el.delivery_id}</Typography>
                <Typography>Date : {el.date}</Typography>
              </Box>
              <Box
                py={2}
                display="flex"
                flexDirection="row"
                justifyContent="space-between">
                <Typography>From : {el.from}</Typography>
                <Typography>To : {el.to}</Typography>
              </Box>
              <Box
                py={2}
                display="flex"
                flexDirection="row"
                justifyContent="space-between">
                <Typography>Receiver : {el.receiver}</Typography>
                <Typography>Status : {el.status}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start">
                <Typography>Item Name : {el.item_name}</Typography>
                <Box width="100%" py={1}>
                  <TextField
                    label="Note"
                    fullWidth
                    multiline
                    variant="outlined"
                    color="primary"
                    size="small"
                    value={el.note}
                    disabled
                    InputProps={{
                      rows: 2,
                    }}
                  />
                </Box>
              </Box>
              <Box width="100%" display="flex" justifyContent="flex-end">
                <Button variant="contained" color="secondary">
                  Cancel
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
