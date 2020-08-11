import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { sendQueryRecipes } from '../../actions/search/recipes';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  IconButton,
  Button,
  Divider,
  Typography,
} from '@material-ui/core';
import { ChevronRight, ChevronLeft } from '@material-ui/icons';

import Sidebar from './Sidebar';
import Content from './Content';

import clsx from 'clsx';

import usePrev from '../../hooks/usePrev';

const drawerWidth = 275;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: theme.zIndex.appBar - 10,
  },
  drawerShift: {
    width: 0,
    marginLeft: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerPaperShift: {
    width: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 66,
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 3, 3),
    marginRight: -drawerWidth,
  },
  contentShift: {
    marginRight: 0,
  },
}));

const Search = ({ pager, query, sendQueryRecipes }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const prevPager = usePrev(pager);
  const prevQuery = usePrev(query);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (
      prevPager &&
      pager.currentPage === prevPager.currentPage &&
      query === prevQuery
    ) {
      return;
    }
    sendQueryRecipes(query, pager);
  }, [query, pager, prevPager, prevQuery, sendQueryRecipes]);

  return (
    <div className={classes.root}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.toolbar}>
          <Typography>Sort by: </Typography>
          <Button
            onClick={handleDrawerToggle}
            className={clsx({
              [classes.hide]: open,
            })}
          >
            <ChevronLeft />
            <Typography variant="button">Advanced Search</Typography>
          </Button>
        </div>
        <Content />
      </main>
      <Drawer
        open={open}
        anchor="right"
        variant="persistent"
        transitionDuration={{ enter: 0, exit: 0 }}
        // className={clsx({
        //   [classes.drawer]: open,
        //   [classes.drawerPaper]: open,
        // })}
        className={clsx({
          [classes.drawer]: open,
          [classes.drawerShift]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerPaper]: open,
            [classes.drawerPaperShift]: !open,
          }),
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronRight />
          </IconButton>
        </div>
        <Divider />
        <Sidebar />
      </Drawer>
    </div>
  );
};

Search.propTypes = {
  pager: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  sendQueryRecipes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pager: state.pager,
  query: state.query,
});

export default connect(mapStateToProps, {
  sendQueryRecipes,
})(Search);
