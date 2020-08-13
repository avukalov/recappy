import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Drawer, Button, Typography, Fab } from '@material-ui/core';
import { Close, Tune, KeyboardArrowUp } from '@material-ui/icons';

import Filterbar from '../search/Filterbar';
import Content from '../search/Content';
import ScrollHandler from '../common/ScrollHandler';
import OptionsToolbar from '../common/OptionsToolbar';

import clsx from 'clsx';

const drawerWidth = 275;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
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
    marginTop: 66,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 3, 3),
    marginRight: -drawerWidth,
  },
  contentShift: {
    marginRight: 0,
  },
  floatingFilters: {
    paddingRight: 30,
    borderRadius: theme.spacing(1, 0, 0, 1),
  },
}));

const Search = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className={classes.root}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div id="back-to-top-anchor" />
        <OptionsToolbar
          sort
          filter
          open={open}
          handleDrawerToggle={handleDrawerToggle}
        />
        {!loading && <Content />}
      </main>

      <Drawer
        open={open}
        anchor="right"
        variant="persistent"
        transitionDuration={{ enter: 0, exit: 0 }}
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
          <Button
            disableRipple
            startIcon={<Close />}
            onClick={handleDrawerToggle}
          >
            <Typography variant="button">Close</Typography>
          </Button>
        </div>

        {!loading && <Filterbar />}
      </Drawer>

      <ScrollHandler {...props} scrollTop={true} open={open}>
        <Fab color="secondary" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollHandler>

      {!open && (
        <ScrollHandler
          {...props}
          search={true}
          handleDrawerToggle={handleDrawerToggle}
        >
          <Button
            color="primary"
            variant="contained"
            startIcon={<Tune />}
            className={classes.floatingFilters}
            onClick={handleDrawerToggle}
          >
            <Typography variant="button">Filters</Typography>
          </Button>
        </ScrollHandler>
      )}
    </div>
  );
};

export default Search;
