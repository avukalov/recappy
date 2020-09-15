import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Drawer, IconButton } from '@material-ui/core';

import NewRecipe from './NewRecipe/NewRecipe';
import UserRecipes from './UserRecipes';
import Favorites from './Favorites';
import Sidebar from './Sidebar';
import Settings from './Settings';

import clsx from 'clsx';
import { CURRENT_COMPONENT } from '../../actions/types';
import { setDashboardComponent } from '../../actions/dashboard';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    zIndex: theme.zIndex.appBar - 1,
  },
  drawerOpen: {
    marginTop: 64,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const profileList = ['New recipe', 'My recipes', 'Favorites'];
const accountList = ['Settings'];

const Dashboard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  // added

  useEffect(() => {
    return () => {
      setDashboardComponent(CURRENT_COMPONENT, 'My recipes')
    }
  }, [])

  const { 
    user,
    dashboard: { current_component },
    setDashboardComponent
  } = props;


  const handleComponents = () => {
    switch (current_component) {
      case 'New recipe':
        return <NewRecipe />;
      case 'My recipes':
        return (
          user && <UserRecipes />
        );
      case 'Favorites':
        return <Favorites />;
      case 'Settings':
        return <Settings />;
      default:
        return ( user && <UserRecipes />);
    }
  };

  return (
    <div className={classes.root}>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <Sidebar
          handleIcon={(currComp) => setDashboardComponent(CURRENT_COMPONENT, currComp)}
          accountList={accountList}
          profileList={profileList}
          currentComp={current_component}
        />
      </Drawer>
      <main className={classes.content}>{handleComponents()}</main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  dashboard: state.dashboard
});

export default connect(mapStateToProps, { setDashboardComponent})(Dashboard);

