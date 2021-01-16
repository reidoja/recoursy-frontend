import {
  Box,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';

interface Props {}

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
    from: '09.00',
    to: '12.00',
  },
  {
    from: '09.00',
    to: '12.00',
  },
];

export default function ViewWorkingHourPage({}: Props): ReactElement {
  const classes = useStyles();

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box width="80%" p={2}>
        <Box display="flex" justifyContent="flex-start" my={2}>
          <Typography variant="h4">Working Hour</Typography>
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
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
