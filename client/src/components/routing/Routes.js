import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Toolbar, LinearProgress } from '@material-ui/core';

// import Alert from '../layout/Alert';
import Register from '../auth/Register';
import Login from '../auth/Login';
import PrivateRoute from '../routing/PrivateRoute';
import NotFound from '../layout/NotFound';
import Dashboard from '../dashboard/Dashboard';
import Search from '../search/Search';
// const Dashboard = lazy(() => import('../dashboard/Dashboard'));
// const Search = lazy(() => import('../search/Search'));

const Routes = (props) => {
  return (
    // <Suspense fallback={<LinearProgress />}>

    <Switch>
      {/* Public Routes */}
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/search" component={Search} />

      {/* Private Routes */}
      <PrivateRoute exact path="/dashboard" component={Dashboard} />

      {/* 
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} /> 
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} /> 
        */}

      <Route component={NotFound} />
    </Switch>
    // </Suspense>
  );
};

export default Routes;
