import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

import setAuthToken from './utils/setAuthToken';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

import Routes from './components/routing/Routes';

import './App.css';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.getItem('token'));
    store.dispatch(loadUser());
  }, []);
  const toolbar = <div style={{ height: 64 }} />;
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div id="main-content">
            {toolbar}
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route component={Routes} />
            </Switch>
            {toolbar}
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
