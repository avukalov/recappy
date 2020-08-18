import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import {
  Fab,
  Button,
  Drawer,
  Typography,
  IconButton,
  duration,
} from '@material-ui/core';
import { Tune, KeyboardArrowUp, Close } from '@material-ui/icons';

import Content from './Content';
import Filterbar from '../filter/Filterbar';
import ScrollHandler from '../common/ScrollHandler';
import OptionsToolbar from '../filter/OptionsToolbar';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  // },
  drawer: {
    height: 'auto',
    marginTop: 125,
    zIndex: theme.zIndex.appBar - 100,
  },
  contentMain: {
    flexGrow: 1,
    padding: theme.spacing(0, 3),
  },
  content: {
    // position: 'relative',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginTop: 70,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
    marginTop: 330,
  },
  floatingFilterButton: {
    paddingRight: 30,
    borderRadius: theme.spacing(1, 0, 0, 1),
  },
  closeButton: {
    position: 'absolute',
    top: 70,
    right: 5,
  },
}));

const Search = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleFilterToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const filterBar = (
    <div className={classes.drawer}>
      <div className={classes.closeButton}>
        <IconButton onClick={handleFilterToggle}>
          <Close />
        </IconButton>
      </div>
      <Filterbar />
    </div>
  );

  return (
    <div className={classes.root}>
      <main className={classes.contentMain}>
        <div id="back-to-top-anchor" />

        <Drawer variant="persistent" anchor="top" open={open}>
          {filterBar}
        </Drawer>

        <OptionsToolbar filtering handleFilterToggle={handleFilterToggle} />

        <div
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          {!loading && <Content />}
        </div>
      </main>

      <ScrollHandler {...props} scrollTop open={open}>
        <Fab color="secondary">
          <KeyboardArrowUp />
        </Fab>
      </ScrollHandler>

      {!open && (
        <ScrollHandler
          {...props}
          search
          open={open}
          handleFilterToggle={handleFilterToggle}
        >
          <Button
            color="primary"
            variant="contained"
            startIcon={<Tune />}
            onClick={handleFilterToggle}
            className={classes.floatingFilterButton}
          >
            <Typography variant="button">Filters</Typography>
          </Button>
        </ScrollHandler>
      )}
    </div>
  );
};

export default Search;
