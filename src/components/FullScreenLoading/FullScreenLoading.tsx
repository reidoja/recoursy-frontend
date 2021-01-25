import { Box, Modal, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import Loading from '../Loading/Loading';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  open?: boolean;
  text?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  light: {
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
}));

export default function FullScreenLoading({
  open,
  text = 'Loading... Please wait',
}: Props): ReactElement {
  const classes = useStyles();

  return (
    <Modal open={!!open}>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column">
        <Box>
          <Loading size="150px" />
        </Box>
        <Typography className={classes.light}>{text}</Typography>
      </Box>
    </Modal>
  );
}
