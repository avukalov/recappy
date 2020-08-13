import React, { Fragment, cloneElement } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { useScrollTrigger } from '@material-ui/core';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@material-ui/core';
import { Dashboard } from '@material-ui/icons';

import Searchbar from '../search/Searchbar';
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
  menuButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  actionIcon: {
    color: 'white',
  },
}));

const ElevationScroll = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  const classes = styles();

  const authLinks = (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Link to="/dashboard">
        <IconButton className={classes.menuButton} aria-label="Dashboard">
          <Dashboard
            color="action"
            classes={{
              colorAction: classes.actionIcon,
            }}
          />
        </IconButton>
      </Link>
      <CardMenu user={user} logout={logout} loading={loading} />
    </Box>
  );

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
    <ElevationScroll>
      <AppBar className={classes.appBar}>
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
          {/* <Link to="/search" className={classes.link}>
            <Typography variant="subtitle2">Advanced Search</Typography>
          </Link> */}
          <Searchbar />
          {!loading && (
            <div className={classes.pushLeft}>
              <Fragment>
                {isAuthenticated ? user && authLinks : guestLinks}
              </Fragment>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
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
