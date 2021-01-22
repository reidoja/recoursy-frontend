import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  error: {
    borderRadius: '5px',
  },
}));

interface Props {
  message: string | any;
  className?: string;
}

export default function ErrorBox({ message, className }: Props): ReactElement {
  const classes = useStyles();

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      p={1}
      display="flex"
      className={`${classes.error} ${className || ''}`}>
      {typeof message === 'string' ? (
        <Typography variant="subtitle2" color="error" align="center">
          {message}
        </Typography>
      ) : (
        message
      )}
    </Box>
  );
}
