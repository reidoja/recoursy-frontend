import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch } from 'react-router';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import ViewDeliveryStatusPage from './pages/ViewDeliveryStatusPage/ViewDeliveryStatusPage';
import SetWorkingHourPage from './pages/SetWorkingHourPage/SetWorkingHourPage';
import ViewWorkingHourPage from './pages/ViewWorkingHourPage/ViewWorkingHourPage';
import ViewRequestPage from './pages/ViewRequestPage/ViewRequestPage';
import ViewDeliveryHistoryPage from './pages/ViewDeliveryHistoryPage/ViewDeliveryHistoryPage';
import RequestDeliveryPage from './pages/RequestDeliveryPage/RequestDeliveryPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/request-delivery" component={RequestDeliveryPage} />
        <Route
          exact
          path="/view-delivery-history"
          component={ViewDeliveryHistoryPage}
        />
        <Route exact path="/view-request" component={ViewRequestPage} />
        <Route exact path="/set-working-hour" component={SetWorkingHourPage} />
        <Route
          exact
          path="/view-working-hour"
          component={ViewWorkingHourPage}
        />
        <Route
          exact
          path="/view-delivery-status"
          component={ViewDeliveryStatusPage}
        />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
