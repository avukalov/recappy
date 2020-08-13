import React, { useState, useEffect } from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';

import { Button, Typography, Fab } from '@material-ui/core';
import { Tune, KeyboardArrowUp } from '@material-ui/icons';

import Content from './Content';
import Filterbar from '../filter/Filterbar';
import ScrollHandler from '../common/ScrollHandler';
import OptionsToolbar from '../common/OptionsToolbar';

import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  filter: {
    backgroundColor: fade(theme.palette.grey[100], 0.5),
  },
  filterOpen: {
    height: 'auto',
    padding: theme.spacing(2, 0),
  },
  filterClosed: {
    display: 'none',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 3),
  },
  floatingFilterButton: {
    paddingRight: 30,
    borderRadius: theme.spacing(1, 0, 0, 1),
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

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div id="back-to-top-anchor" />
        <OptionsToolbar
          sort
          filter
          open={open}
          handleFilterToggle={handleFilterToggle}
        />
        <div
          className={clsx(classes.filter, {
            [classes.filterOpen]: open,
            [classes.filterClosed]: !open,
          })}
        >
          {!loading && <Filterbar />}
        </div>
        {!loading && <Content />}
      </main>

      <ScrollHandler {...props} scrollTop={true} open={open}>
        <Fab color="secondary" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollHandler>

      {!open && (
        <ScrollHandler {...props} search={true}>
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
