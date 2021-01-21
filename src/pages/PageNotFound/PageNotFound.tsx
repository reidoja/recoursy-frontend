import { Box, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

interface Props {}

export default function PageNotFound({}: Props): ReactElement {
  return (
    <Box
      display="flex"
      width="100%"
      height="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center">
      <Typography variant="h3" color="error">
        404 Page Not Found
      </Typography>
    </Box>
  );
}
