import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import {
  Drawer,
  IconButton,
} from '@material-ui/core';

import NewRecipe from './NewRecipe/NewRecipe';
import MyRecipes from './MyRecipes';
<<<<<<< HEAD
import Favorites from './Favorites';
=======
>>>>>>> 88e673ef39fc7717a6eb35976bc293a8049577f9
import Sidebar from './Sidebar';

import clsx from 'clsx';

import store from '../../store';

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
const accountList = ['Settings']

const Dashboard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  // added
  const {
    user
  } = props;
  
  const [currentComp, setComp] = useState('My recipes');

  const handleIcon = useCallback(
    currentComp => {
      setComp(currentComp);
    },
    [currentComp]
  );

  const handleComponentFromChild = (comp) => {
    setComp(comp);
  }

  const handleComponents = () => {
    switch(currentComp){
      case 'New recipe':
        return <NewRecipe />;
      case 'My recipes':
<<<<<<< HEAD
        return user && <MyRecipes changeComponent={handleComponentFromChild} />;
      case 'Favorites':
        return  <Favorites />;
=======
        return <MyRecipes changeComponent={handleComponentFromChild} user={store.getState().auth.user}/>;
>>>>>>> 88e673ef39fc7717a6eb35976bc293a8049577f9
      // default:
    }
  }

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
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
        <Sidebar handleIcon={handleIcon} accountList={accountList} profileList={profileList}/>
      </Drawer>
      <main className={classes.content}>
        {handleComponents()}
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {  })(Dashboard);

