import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

import CardMenu from '../common/CardMenu';

const styles = makeStyles((theme) => ({
  appBar: {
    height: 64,
    zIndex: theme.zIndex.appBar,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  title: {
    fontFamily: 'Kaushan Script',
  },
  pushLeft: {
    marginLeft: 'auto',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    margin: theme.spacing(1, 1.5),
  },
}));

const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  const classes = styles();

  const authLinks = <CardMenu user={user} logout={logout} loading={loading} />;

  const guestLinks = (
    <Fragment>
      <Link to="/login" className={classes.link}>
        <Button color="primary" variant="contained">
          Login
        </Button>
      </Link>
      <Link to="/register" className={classes.link}>
        <Button color="secondary" variant="contained">
          Register
        </Button>
      </Link>
    </Fragment>
  );

  return (
    <AppBar elevation={2} className={classes.appBar}>
      <Toolbar>
        <Link to="/" className={classes.link}>
          <Typography
            variant="h4"
            color="inherit"
            gutterBottom
            className={classes.title}
          >
            Reccapy
          </Typography>
        </Link>
        <Link to="/search" className={classes.link}>
          <Button color="primary" variant="contained">
            Advanced Search
          </Button>
        </Link>
        {!loading && (
          <div className={classes.pushLeft}>
            <Fragment>
              {isAuthenticated ? user && authLinks : guestLinks}
            </Fragment>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
