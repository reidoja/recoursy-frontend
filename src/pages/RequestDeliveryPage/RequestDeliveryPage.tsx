import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { ReactElement, useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  addBtn: {
    borderRadius: '20px',
  },
}));

interface Props {}

export default function RequestDeliveryPage({}: Props): ReactElement {
  const classes = useStyles();

  const [detailRequest, setDetailRequest] = useState<
    { to: string; receiver: string; item: string; note: string }[]
  >([]);

  console.log(detailRequest);

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box width="80%" p={2}>
        <Box display="flex" justifyContent="flex-start" my={2}>
          <Typography variant="h4">Request Delivery</Typography>
        </Box>
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <TextField type="text" label="From" />
              <Box py={2} width="100%" display="flex" justifyContent="flex-end">
                <Button
                  className={classes.addBtn}
                  variant="outlined"
                  onClick={() => {
                    const newArr = {
                      to: '',
                      receiver: '',
                      item: '',
                      note: '',
                    };
                    setDetailRequest((oldArray) => [...oldArray, newArr]);
                  }}>
                  Add Item
                </Button>
              </Box>
              {detailRequest.map((el, index) => (
                <Box key={index} width="100%" borderBottom="1px solid" py={2}>
                  <Box width="100%" display="flex" justifyContent="flex-end">
                    <IconButton
                      size="small"
                      onClick={() => {
                        const newArr = detailRequest.filter(
                          (el, idx) => idx !== index
                        );
                        setDetailRequest(newArr);
                      }}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                  <Box
                    py={2}
                    width="100%"
                    display="flex"
                    justifyContent="space-between">
                    <TextField
                      onChange={(e) => {
                        const value = e.target.value;
                        let newArr = [...detailRequest];
                        newArr[index].to = value;
                        setDetailRequest(newArr);
                      }}
                      value={el.to}
                      variant="outlined"
                      type="text"
                      label="To"
                    />
                    <TextField
                      onChange={(e) => {
                        const value = e.target.value;
                        let newArr = [...detailRequest];
                        newArr[index].receiver = value;
                        setDetailRequest(newArr);
                      }}
                      value={el.receiver}
                      type="text"
                      variant="outlined"
                      label="Receiver"
                    />
                  </Box>
                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start">
                    <Box py={2}>
                      <TextField
                        onChange={(e) => {
                          const value = e.target.value;
                          let newArr = [...detailRequest];
                          newArr[index].item = value;
                          setDetailRequest(newArr);
                        }}
                        value={el.item}
                        type="text"
                        variant="outlined"
                        label="Item"
                      />
                    </Box>
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        const value = e.target.value;
                        let newArr = [...detailRequest];
                        newArr[index].note = value;
                        setDetailRequest(newArr);
                      }}
                      multiline
                      variant="outlined"
                      value={el.note}
                      type="text"
                      label="Note"
                      InputProps={{
                        rows: 3,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
