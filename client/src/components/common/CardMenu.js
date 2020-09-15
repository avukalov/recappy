import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  IconButton,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  Avatar,
  Typography,
  Grid,
  Divider,
  Badge,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
  },
  avatar: {
    alignSelf: 'center',
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  userData: {
    margin: 'auto',
  },
  manageButton: {
    borderRadius: 50,
    textTransform: 'none',
  },
  actionIcon: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  popperIndex: {
    zIndex: theme.zIndex.tooltip,
  },
}));


const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: -1,
      left: -1,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const CardMenu = ({ user, logout }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const prevOpen = useRef(open);

  // return focus to the button when we transitioned from !open -> open

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <IconButton
        ref={anchorRef}
        onClick={handleToggle}
        className={classes.actionIcon}
      >
        <StyledBadge
          overlap='circle'
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Avatar alt='gravatar' src={user.gravatarUrl} />
        </StyledBadge>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        className={classes.popperIndex}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'right top',
            }}
          >
            <Paper elevation={4} className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <Grid container direction='column' spacing={2}>
                  <Grid
                    item
                    xs={12}
                    container
                    alignItems='center'
                    justify='center'
                  >
                    <Avatar
                      alt="gravatar"
                      src={user.gravatarUrl}
                      className={classes.avatar}
                    />
                  </Grid>
                  <Grid item xs={12} container direction='column'>
                    <Typography
                      variant='h6'
                      component='h2'
                      className={classes.userData}
                    >
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant='body2'
                      component='h2'
                      className={classes.userData}
                    >
                      {user.email}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                      <Button
                        onClick={handleClose}
                        color='inherit'
                        variant='outlined'
                        className={classes.manageButton}
                      >
                        Manage your Recappy Account
                      </Button>
                    </Link>
                  </Grid>
                  <Divider components='hr' />
                  <Grid
                    item
                    xs={12}
                    container
                    alignItems='center'
                    justify='center'
                  >
                    <Link to='/' style={{ textDecoration: 'none' }}>
                      <Button
                        color='default'
                        variant='outlined'
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default CardMenu;
