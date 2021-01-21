import { Box } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import RequestDeliveryPage from '../pages/RequestDeliveryPage/RequestDeliveryPage';
import SetWorkingHourPage from '../pages/SetWorkingHourPage/SetWorkingHourPage';
import ViewDeliveryHistoryPage from '../pages/ViewDeliveryHistoryPage/ViewDeliveryHistoryPage';
import ViewDeliveryStatusPage from '../pages/ViewDeliveryStatusPage/ViewDeliveryStatusPage';
import ViewRequestPage from '../pages/ViewRequestPage/ViewRequestPage';
import ViewWorkingHourPage from '../pages/ViewWorkingHourPage/ViewWorkingHourPage';

interface Props {}

export default function MainRoute({}: Props): ReactElement {
  return (
    <Box>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
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
    </Box>
  );
}
