import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router';
import LoginPage from './pages/LoginPage/LoginPage';
import MainRoute from './routes/MainRoute';
import { getCookie } from './utlis/cookies';

function App() {
  const token = getCookie('tkn') || '';

  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route path="/" component={MainRoute} />
      </Switch>
    </div>
  );
}

export default App;
