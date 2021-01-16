import React, { ReactElement } from 'react';
import { Modal, Box, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: '5px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: ({ width }: any) => width || 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },
}));

interface Props {
  children: any;
  open: boolean;
  handleClose: () => void;
  width?: number;
}

export default function CustomModal({
  children,
  open,
  handleClose,
  width,
}: Props): ReactElement {
  const classes = useStyles({ width });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={classes.container}>{children}</Box>
    </Modal>
  );
}
