import {
  Box,
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
import useFetchWorkHour from '../../effects/queries/workhour/useFetchWorkHour';
import SearchIcon from '@material-ui/icons/Search';

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    width: '100%',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottom: '1px solid rgba(50, 50, 50, 0.2)',
  },
  card: {
    marginBottom: '24px',
  },
  searchIcon: {
    color: theme.palette.primary.main,
  },
}));

export default function ViewWorkingHourPage({}: Props): ReactElement {
  const classes = useStyles();

  const [search, setSearch] = useState('');
  const [thisSearch, setThisSearch] = useState('');

  const { data: dataWorkHour, error: errorWorkHour } = useFetchWorkHour(search);

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box width="80%" p={2}>
        <Box display="flex" justifyContent="flex-start" my={2}>
          <Typography variant="h4">Working Hour</Typography>
        </Box>
        <Card>
          <CardContent>
            <List>
              {dataWorkHour &&
                dataWorkHour.map((el, index) => (
                  <ListItem key={index} className={classes.listItem}>
                    <Box width="50%">
                      <Typography>From : {el.from}</Typography>
                      <Typography>To : {el.to}</Typography>
                    </Box>
                    <Box>
                      <Typography>Note: </Typography>
                      <Typography>{el.note}</Typography>
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
