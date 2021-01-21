import {
  Box,
  Card,
  CardContent,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: '500px',
    height: '500px',
  },
  cardContent: {
    height: '100%',
  },
}));

export default function LoginPage({}: Props): ReactElement {
  const classes = useStyles();

  return (
    <Box
      width="100vw"
      height="100vh"
      top={0}
      position="fixed"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center">
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Box
            height="30%"
            color="#3f51b5"
            display="flex"
            flexDirection="column"
            justifyContent="center">
            <Typography variant="h3" color="inherit">
              Login
            </Typography>
          </Box>
          <Box
            height="70%"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start">
            <Box py={2} display="flex" flexDirection="column">
              <TextField variant="outlined" type="text" label="Email" />
            </Box>
            <Box py={2} display="flex" flexDirection="column">
              <TextField variant="outlined" type="password" label="Password" />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
