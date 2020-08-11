import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import Alert from '../layout/Alert';
import PrivateRoute from '../routing/PrivateRoute';

import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import Search from '../search/Search';
import NotFound from '../layout/NotFound';

const Routes = (props) => {
  return (
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
  );
};

export default Routes;
