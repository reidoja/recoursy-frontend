import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import CustomModal from '../../components/CustomModal/CustomModal';

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    width: '100%',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottom: '1px solid rgba(50, 50, 50, 0.2)',
  },
}));

const data = [
  {
    from: '09.00',
    to: '12.00',
  },
  {
    from: '09.00',
    to: '12.00',
  },
];

export default function SetWorkingHourPage({}: Props): ReactElement {
  const classes = useStyles();

  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <CustomModal
        handleClose={() => setIsOpenModal(false)}
        open={isOpenModal}
        width={600}>
        <Box width="100%">
          <Typography variant="h6">Add Working Hour</Typography>
          <Box py={2} display="flex" alignItems="center">
            <Typography>From :</Typography>
            <TextField type="time" />
          </Box>
          <Box py={2} display="flex" alignItems="center">
            <Typography>To :</Typography>
            <TextField type="time" />
          </Box>
          <Box width="100%" display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsOpenModal(false)}>
              Add
            </Button>
          </Box>
        </Box>
      </CustomModal>
      <Box width="100%" display="flex" justifyContent="center">
        <Box width="80%" p={2}>
          <Box display="flex" justifyContent="flex-start" my={2}>
            <Typography variant="h4">Working Hour</Typography>
          </Box>
          <Box width="100%" display="flex" justifyContent="flex-end" my={2}>
            <Button
              onClick={() => setIsOpenModal(true)}
              variant="contained"
              color="primary">
              + Add Working Hour
            </Button>
          </Box>
          <Card>
            <CardContent>
              <List>
                {data.map((el, index) => (
                  <ListItem key={index} className={classes.listItem}>
                    <Box>
                      <Typography>From : {el.from}</Typography>
                      <Typography>To : {el.to}</Typography>
                    </Box>
                    <IconButton size="small" onClick={() => {}}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
}
