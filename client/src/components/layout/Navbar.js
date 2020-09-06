import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  Slide,
} from '@material-ui/core';
import { Dashboard } from '@material-ui/icons';

import Searchbar from '../search/Searchbar';
import SearchNav from '../search/SearchNav';
import CardMenu from '../common/CardMenu';

const styles = makeStyles((theme) => ({
  appBar: {
    height: 64,
    zIndex: theme.zIndex.appBar + 1000,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  searchBar: {
    background: 'transparent',
    zIndex: theme.zIndex.appBar + 1000,
  },
  title: {
    fontFamily: 'Kaushan Script',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  pushLeft: {
    minWidth: 200,
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    margin: theme.spacing(0, 1),
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

const HideOnScroll = (props) => {
  const { children } = props;

  const location = useLocation();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  if (location.pathname === '/search') {
    return (
      <Slide appear={false} direction='down' in={!trigger}>
        {children}
      </Slide>
    );
  } else {
    return <>{children}</>;
  }
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const ShowOnScroll = (props) => {
  const { children } = props;

  const location = useLocation();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  return (
    <Slide
      appear={false}
      direction='down'
      in={trigger && location.pathname === '/search'}
    >
      {children}
    </Slide>
  );
};

ShowOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  const classes = styles();

  const authLinks = (
    <Box display='flex' flexDirection='row' alignItems='center'>
      <Link to='/dashboard'>
        <IconButton className={classes.menuButton} aria-label='Dashboard'>
          <Dashboard
            color='action'
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
    <div className={classes.flexRow}>
      <Link to='/login' className={classes.link}>
        <Button color='primary' variant='contained'>
          Login
        </Button>
      </Link>
      <Link to='/register' className={classes.link}>
        <Button color='secondary' variant='contained'>
          Register
        </Button>
      </Link>
    </div>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Link to='/' className={classes.link}>
              <Typography
                variant='h4'
                color='inherit'
                gutterBottom
                className={classes.title}
              >
                Recappy
              </Typography>
            </Link>

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
      </HideOnScroll>
      <ShowOnScroll>
        <AppBar elevation={0} className={classes.searchBar}>
          <Toolbar>
            <SearchNav />
          </Toolbar>
        </AppBar>
      </ShowOnScroll>
    </>
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
