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
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import SelectInput from '../../components/SelectInput/SelectInput';

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
    detail: [
      {
        item_name: 'Surat Peringatan',
        to: '1405',
        receiver: 'asd@gmail.com',
        status: 'Pending',
        note: 'Berkas warna coklat, tali merah',
      },
    ],
  },
  {
    delivery_id: '12345',
    date: 'Jan 16 2020',
    from: '1305',
    detail: [
      {
        item_name: 'Surat Peringatan',
        to: '1405',
        receiver: 'asd@gmail.com',
        status: 'Pending',
        note: 'Berkas warna coklat, tali merah',
      },
      {
        item_name: 'Surat Peringatan',
        to: '1405',
        receiver: 'asd@gmail.com',
        status: 'Pending',
        note: 'Berkas warna coklat, tali merah',
      },
    ],
  },
];

interface Props {}

export default function ViewDeliveryStatusPage({}: Props): ReactElement {
  const classes = useStyles();

  const [listStatus, setListStatus] = useState<string[]>([]);

  return (
    <Box width="100%" display="flex" justifyContent="center">
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
                    flexDirection="column"
                    alignItems="flex-start">
                    <Typography>From : {el.from}</Typography>
                  </Box>
                  <Box borderBottom="1px solid" />
                  <List className={classes.list}>
                    {el.detail.map((el1, index) => (
                      <ListItem className={classes.listItem} key={index}>
                        <Box display="flex" width="100%">
                          <Typography>Item Name : {el1.item_name}</Typography>
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
                            <Typography>Receiver : {el1.receiver}</Typography>
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
                              onChange={(e) => {}}
                              options={[
                                { value: 'Completed' },
                                { value: 'Pending' },
                                { value: 'Canceled' },
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
                            value={el1.note}
                            disabled
                            InputProps={{
                              rows: 2,
                            }}
                          />
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                  <Box width="100%" display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary">
                      Update
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Box width="50%" p={2}>
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
                    flexDirection="column"
                    alignItems="flex-start">
                    <Typography>From : {el.from}</Typography>
                  </Box>
                  <Box borderBottom="1px solid" />
                  <List className={classes.list}>
                    {el.detail.map((el1, index) => (
                      <ListItem className={classes.listItem} key={index}>
                        <Box display="flex" width="100%">
                          <Typography>Item Name : {el1.item_name}</Typography>
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
                            <Typography>Receiver : {el1.receiver}</Typography>
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
                              onChange={(e) => {}}
                              options={[
                                { value: 'Completed' },
                                { value: 'Pending' },
                                { value: 'Canceled' },
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
                            value={el1.note}
                            disabled
                            InputProps={{
                              rows: 2,
                            }}
                          />
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                  <Box width="100%" display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary">
                      Update
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
