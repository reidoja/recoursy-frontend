import {
  AppBar,
  Badge,
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
import React, { ReactElement, useEffect, useState } from 'react';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from 'react-router';
import { eraseCookie } from '../../utils/cookies';
import { useRecoilState, useSetRecoilState } from 'recoil';
import userState from '../../states/UserState';
import useFetchNotif from '../../effects/queries/notif/useFetchNotif';
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
  none: {
    display: 'none',
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
  pointer: {
    cursor: 'pointer',
  },
}));

export default function Navbar({}: Props): ReactElement {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useRecoilState(userState);

  const { data, refetch: fetchNotif, status } = useFetchNotif(
    user?.user.id || 0
  );

  useEffect(() => {
    if (status === 'success') {
      window.location.reload();
    }
  }, [status]);

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
        <Box
          mr={2}
          display="flex"
          alignItems="center"
          onClick={() => {
            fetchNotif();
            if (user?.user.role === 'admin') {
              history.push('/view-delivery-status');
            } else if (user?.user.role === 'user') {
              history.push('/view-delivery-history');
            }
          }}
          className={classes.pointer}>
          <Badge
            color="secondary"
            variant="dot"
            invisible={user?.user.hasNotif ? false : true}>
            <NotificationsActiveIcon />
          </Badge>
        </Box>
        <Typography>Hello, {user?.user.name}</Typography>
        <Button
          onClick={() => {
            setUser(null);
            eraseCookie('tkn');
          }}
          color="inherit">
          Logout
        </Button>
      </Toolbar>
      <Box className={isOpen ? classes.overlay : classes.hideOverlay}>
        <List className={isOpen ? classes.content : classes.hideSideBar}>
          <ListItem
            className={`${
              user && user.user.role === 'user'
                ? classes.none
                : classes.listItem
            }`}
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
            className={`${
              user && user.user.role === 'user'
                ? classes.none
                : classes.listItem
            }`}>
            View Delivery Status <ArrowForwardIosIcon />
          </ListItem>
          <ListItem
            className={
              user && user.user.role === 'admin'
                ? classes.none
                : classes.listItem
            }
            onClick={() => {
              history.push('/view-working-hour');
              setIsOpen(false);
            }}>
            View Working Hour <ArrowForwardIosIcon />
          </ListItem>
          <ListItem
            className={
              user && user.user.role === 'admin'
                ? classes.none
                : classes.listItem
            }
            onClick={() => {
              history.push('/view-request');
              setIsOpen(false);
            }}>
            View Request <ArrowForwardIosIcon />
          </ListItem>
          <ListItem
            className={
              user && user.user.role === 'admin'
                ? classes.none
                : classes.listItem
            }
            onClick={() => {
              history.push('/view-delivery-history');
              setIsOpen(false);
            }}>
            View Delivery History <ArrowForwardIosIcon />
          </ListItem>
          <ListItem
            className={
              user && user.user.role === 'admin'
                ? classes.none
                : classes.listItem
            }
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
