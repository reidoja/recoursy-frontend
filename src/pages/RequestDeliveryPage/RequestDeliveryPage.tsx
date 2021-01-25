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
import React, { ReactElement, useEffect, useState } from 'react';
import FullScreenLoading from '../../components/FullScreenLoading/FullScreenLoading';
import ErrorModal from '../../components/NotificationModal/ErrorModal';
import SuccessModal from '../../components/NotificationModal/SuccessModal';
import useCreateDelivery from '../../effects/mutations/delivery/useCreateDelivery';
import { PostDelivery } from '../../models/Delivery';

const useStyles = makeStyles((theme: Theme) => ({
  addBtn: {
    borderRadius: '20px',
  },
}));

interface Props {}
export default function RequestDeliveryPage({}: Props): ReactElement {
  const classes = useStyles();

  const [from, setFrom] = useState('');

  const [detailRequest, setDetailRequest] = useState<
    {
      room_destination: string;
      to: string;
      itemName: string;
      itemNote: string;
    }[]
  >([]);

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const [
    createDelivery,
    {
      isLoading: isDeliveryLoading,
      error: deliveryError,
      status: deliveryStatus,
    },
  ] = useCreateDelivery();

  const handleSubmit = () => {
    const data: PostDelivery = {
      from: from,
      details: detailRequest,
    };
    createDelivery(data);
  };

  useEffect(() => {
    if (deliveryError) {
      setOpenError(true);
    } else if (deliveryStatus === 'success') {
      setOpenSuccess(true);
    }
  }, [deliveryError, deliveryStatus]);

  return (
    <>
      <FullScreenLoading open={isDeliveryLoading} />
      <ErrorModal
        error={deliveryError}
        onButtonClickOrClose={() => setOpenError(false)}
        open={openError}
      />
      <SuccessModal
        desc="Request Success"
        open={openSuccess}
        onButtonClickOrClose={() => {
          setOpenSuccess(false);
        }}
      />
      <Box width="100%" display="flex" justifyContent="center">
        <Box width="80%" p={2}>
          <Box display="flex" justifyContent="flex-start" my={2}>
            <Typography variant="h4">Request Delivery</Typography>
          </Box>
          <Card>
            <CardContent>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start">
                <TextField
                  type="text"
                  label="From"
                  value={from}
                  onChange={(el) => {
                    const value = el.target.value;
                    setFrom(value);
                  }}
                />
                <Box
                  py={2}
                  width="100%"
                  display="flex"
                  justifyContent="flex-end">
                  <Button
                    className={classes.addBtn}
                    variant="outlined"
                    onClick={() => {
                      const newArr = {
                        room_destination: '',
                        to: '',
                        itemName: '',
                        itemNote: '',
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
                          newArr[index].room_destination = value;
                          setDetailRequest(newArr);
                        }}
                        value={el.room_destination}
                        variant="outlined"
                        type="text"
                        label="To"
                      />
                      <TextField
                        onChange={(e) => {
                          const value = e.target.value;
                          let newArr = [...detailRequest];
                          newArr[index].to = value;
                          setDetailRequest(newArr);
                        }}
                        value={el.to}
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
                            newArr[index].itemName = value;
                            setDetailRequest(newArr);
                          }}
                          value={el.itemName}
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
                          newArr[index].itemNote = value;
                          setDetailRequest(newArr);
                        }}
                        multiline
                        variant="outlined"
                        value={el.itemNote}
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
          <Box width="100%" py={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Request
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
