import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import 'babel-polyfill';

import createHistory from 'history/createBrowserHistory';

// import LoginPage from '../components/LoginPage.jsx';
import LoginPage from '../components/LoginPage.jsx';
import SignupPage from '../components/SignupPage.jsx';
import DashboardPage from '../components/DashboardPage.jsx';
import NotFoundPage from '../components/NotFoundPage.jsx';
import Board from '../components/Board.jsx';
import PrivateRoute from '../routers/PrivateRoute.jsx';

const history = createHistory();
export default class AppRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <PrivateRoute exact path="/test/:id" component={DashboardPage} />
            <PrivateRoute exact path="/test/:id/:board" component={Board} />
            <Route exact path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}
