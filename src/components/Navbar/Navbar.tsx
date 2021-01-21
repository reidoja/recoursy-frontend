import {
  AppBar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Menu,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from 'react-router';
interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    color: theme.palette.common.white,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  overlay: {
    top: '64px',
    minHeight: 'calc(100vh - 64px)',
    width: '100vw',
    zIndex: 999,
    position: 'fixed',
    left: 0,
    opacity: 1,
    backgroundColor: 'rgba(50, 50, 50, 0.3)',
    transition: 'opacity 350ms ease-in',
  },
  content: {
    color: 'black',
    transform: 'translteX(0)',
    transition: 'transform 250ms ease-out',
    height: 'calc(100vh - 64px)',
    width: '250px',
    backgroundColor: 'white',
    overflow: 'auto',
  },
  hideOverlay: {
    top: '64px',
    minHeight: 'calc(100vh - 64px)',
    width: '100vw',
    zIndex: 999,
    position: 'fixed',
    left: 0,
    backgroundColor: 'rgba(50, 50, 50, 0.3)',
    transition: 'opacity 350ms ease-in',
    opacity: 0,
    pointerEvents: 'none',
  },
  hideSideBar: {
    color: 'black',
    transition: 'transform 250ms ease-out',
    height: 'calc(100vh - 64px)',
    width: '250px',
    backgroundColor: 'white',
    overflow: 'auto',
    transform: 'translateX(-100%)',
  },
  listItem: {
    cursor: 'pointer',
    padding: '16px',
    borderBottom: '1px solid rgba(50, 50, 50, 0.2)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default function Navbar({}: Props): ReactElement {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer">
          <MenuIcon />
        </IconButton>
        <Typography
          onClick={() => history.push('/home')}
          className={classes.title}
          variant="h6"
          noWrap>
          ReCourSy
        </Typography>
        <Button onClick={() => history.push('/login')} color="inherit">
          Login
        </Button>
      </Toolbar>
      <Box className={isOpen ? classes.overlay : classes.hideOverlay}>
        <List className={isOpen ? classes.content : classes.hideSideBar}>
          <ListItem
            className={classes.listItem}
            onClick={() => {
              history.push('/set-working-hour');
              setIsOpen(false);
            }}>
            Set Working Hour <ArrowForwardIosIcon />
          </ListItem>
          <ListItem
            onClick={() => {
              history.push('/view-delivery-status');
              setIsOpen(false);
            }}
            className={classes.listItem}>
            View Delivery Status <ArrowForwardIosIcon />
          </ListItem>
          <ListItem
            className={classes.listItem}
            onClick={() => {
              history.push('/view-working-hour');
              setIsOpen(false);
            }}>
            View Working Hour <ArrowForwardIosIcon />
          </ListItem>
          <ListItem
            className={classes.listItem}
            onClick={() => {
              history.push('/view-request');
              setIsOpen(false);
            }}>
            View Request <ArrowForwardIosIcon />
          </ListItem>
          <ListItem
            className={classes.listItem}
            onClick={() => {
              history.push('/view-delivery-history');
              setIsOpen(false);
            }}>
            View Delivery History <ArrowForwardIosIcon />
          </ListItem>
          <ListItem
            className={classes.listItem}
            onClick={() => {
              history.push('/request-delivery');
              setIsOpen(false);
            }}>
            Request Delivery <ArrowForwardIosIcon />
          </ListItem>
        </List>
      </Box>
    </AppBar>
  );
}
