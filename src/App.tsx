import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import LoginPage from './pages/LoginPage/LoginPage';
import MainRoute from './routes/MainRoute';
import { eraseCookie, getCookie, setCookie } from './utils/cookies';
import { useRecoilState } from 'recoil';
import userState from './states/UserState';
import useAuthenticate from './effects/queries/auth/useAuthenticate';
import { Box, Typography } from '@material-ui/core';
import Loading from './components/Loading/Loading';
import ViewWorkingHourPage from './pages/ViewWorkingHourPage/ViewWorkingHourPage';

function App() {
  const [user, setUser] = useRecoilState(userState);
  const [hasCheckUser, setHasCheckUser] = useState(false);

  const history = useHistory();

  const { refetch } = useAuthenticate({
    enabled: false,
    onSuccess(res) {
      console.log(res.data);
      setUser({
        user: res.data,
        token: getCookie('tkn') || '',
      });
    },
    retry: false,
    onError() {
      setHasCheckUser(true);
      eraseCookie('tkn');
    },
  });

  // useEffect(() => {
  //   if (user) history.push('/');
  // }, [user, history]);

  const firstTime = useRef(true);
  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
      return;
    }
    setHasCheckUser(true);
  }, [user]);

  useEffect(() => {
    const token = getCookie('tkn') || '';
    if (!token) {
      setHasCheckUser(true);
      return;
    }
    refetch();
  }, [refetch]);

  // console.log(hasCheckUser);
  if (!hasCheckUser)
    return (
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
        <Typography>Loading... Please wait</Typography>
      </Box>
    );

  console.log({ user });
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/view-all-working-hour"
          component={ViewWorkingHourPage}
        />
        <Route exact path="/login">
          {!user ? <LoginPage /> : <Redirect to="/" />}
        </Route>
        <Route path="*">
          {user ? <MainRoute /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
