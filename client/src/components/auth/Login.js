import React, { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Container,
  Zoom,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ login, isAuthenticated, loading }) => {
  const classes = useStyles();

  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const { email, password, remember } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password, remember);
  };

  if (isAuthenticated && !loading) {
    return <Redirect to={location.state.prevPath} />;
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Zoom in={true}>
            <TextField
              required
              fullWidth
              id='email'
              name='email'
              margin='normal'
              label='Email Address'
              color='secondary'
              variant='outlined'
              autoComplete='email'
              value={email}
              onChange={onChange}
            />
          </Zoom>
          <Zoom in={true}>
            <TextField
              required
              fullWidth
              id='password'
              name='password'
              margin='normal'
              label='Password'
              type='password'
              color='secondary'
              variant='outlined'
              autoComplete='current-password'
              value={password}
              onChange={onChange}
            />
          </Zoom>
          <Zoom in={true}>
            <FormControlLabel
              control={
                <Checkbox
                  name='remember'
                  color='secondary'
                  value={remember}
                  onChange={onChange}
                />
              }
              label='Remember me'
            />
          </Zoom>
          <Zoom in={true}>
            <Button
              fullWidth
              type='submit'
              color='secondary'
              variant='contained'
              className={classes.submit}
            >
              Login
            </Button>
          </Zoom>
          <Zoom in={true}>
            <Grid container justify='flex-end'>
              <Grid item xs>
                <Link to='/password-reset' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Zoom>
        </form>
      </div>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
