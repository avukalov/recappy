import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Zoom,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = ({ setAlert, register, isAuthenticated }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  });

  const { firstName, lastName, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
      console.log('Passwords do not match', 'danger');
    } else {
      register({ firstName, lastName, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate={false} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Zoom in={true}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  name="firstName"
                  color="secondary"
                  variant="outlined"
                  label="First Name"
                  autoComplete="firstname"
                  value={firstName}
                  onChange={onChange}
                />
              </Grid>
            </Zoom>
            <Zoom in={true}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  color="secondary"
                  variant="outlined"
                  autoComplete="lname"
                  value={lastName}
                  onChange={onChange}
                />
              </Grid>
            </Zoom>
            <Zoom in={true}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  color="secondary"
                  variant="outlined"
                  autoComplete="email"
                  value={email}
                  onChange={onChange}
                />
              </Grid>
            </Zoom>
            <Zoom in={true}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  color="secondary"
                  variant="outlined"
                  autoComplete="current-password"
                  value={password}
                  onChange={onChange}
                />
              </Grid>
            </Zoom>
            <Zoom in={true}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password2"
                  name="password2"
                  type="password"
                  label="Re-Password"
                  color="secondary"
                  variant="outlined"
                  autoComplete="current-password"
                  value={password2}
                  onChange={onChange}
                />
              </Grid>
            </Zoom>
            <Zoom in={true}>
              <Button
                fullWidth
                type="submit"
                color="secondary"
                variant="contained"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </Zoom>
            <Zoom in={true}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Zoom>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
