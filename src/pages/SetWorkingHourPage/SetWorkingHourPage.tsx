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
import useFetchWorkHour from '../../effects/queries/workhour/useFetchWorkHour';
import useCreateWorkHour from '../../effects/mutations/workhour/useCreateWorkHour';
import useDeleteWorkHour from '../../effects/mutations/workhour/useDeleteWorkHour';

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

  const { data: dataWorkHour, error: errorWorkHour } = useFetchWorkHour('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [wordHourState, setWordHourState] = useState<{
    from: string;
    to: string;
    note: string;
  }>({
    from: '',
    to: '',
    note: '',
  });

  const [
    createWorkHour,
    {
      isLoading: isWorkHourLoading,
      error: workHourError,
      status: workHourStatus,
    },
  ] = useCreateWorkHour();

  const [
    deleteWorkHour,
    { isLoading: isDeleterLoading, error: deleteError, status: deleteStatus },
  ] = useDeleteWorkHour();

  return (
    <>
      <CustomModal
        handleClose={() => setIsOpenModal(false)}
        open={isOpenModal}
        width={600}>
        <Box width="100%">
          <Typography variant="h6">Add Working Hour</Typography>
          <Box
            py={2}
            display="flex"
            alignItems="center"
            width="50%"
            justifyContent="space-between">
            <Typography>From :</Typography>
            <TextField
              type="time"
              value={wordHourState.from}
              onChange={(e) => {
                const value = e.target.value;
                setWordHourState((prev) => ({
                  ...prev,
                  from: value,
                }));
              }}
            />
          </Box>
          <Box
            py={2}
            display="flex"
            alignItems="center"
            width="50%"
            justifyContent="space-between">
            <Typography>To :</Typography>
            <TextField
              value={wordHourState.to}
              type="time"
              onChange={(e) => {
                const value = e.target.value;
                setWordHourState((prev) => ({
                  ...prev,
                  to: value,
                }));
              }}
            />
          </Box>
          <Box py={2}>
            <Typography>Note :</Typography>
            <TextField
              label="Note"
              fullWidth
              multiline
              variant="outlined"
              color="primary"
              size="small"
              value={wordHourState.note}
              onChange={(e) => {
                const value = e.target.value;
                setWordHourState((prev) => ({
                  ...prev,
                  note: value,
                }));
              }}
              InputProps={{
                rows: 2,
              }}
            />
          </Box>
          <Box width="100%" display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                createWorkHour(wordHourState);
                setIsOpenModal(false);
              }}>
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
                {dataWorkHour &&
                  dataWorkHour.map((el, index) => (
                    <ListItem key={index} className={classes.listItem}>
                      <Box width="100%" display="flex">
                        <Box width="50%">
                          <Typography>From : {el.from}</Typography>
                          <Typography>To : {el.to}</Typography>
                        </Box>
                        <Box>
                          <Typography>Note :</Typography>
                          <Typography>{el.note}</Typography>
                        </Box>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => {
                          deleteWorkHour({ id: el.id });
                        }}>
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
