import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { sendQueryRecipes } from '../../actions/search/recipes';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Button, Typography, Fab } from '@material-ui/core';
import { Close, Tune, KeyboardArrowUp } from '@material-ui/icons';

import Filterbar from './Filterbar';
import Content from './Content';
import ScrollHandler from '../common/ScrollHandler';
import OptionsToolbar from './OptionsToolbar';

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
}));

const Search = ({ pager, query, sendQueryRecipes }, props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

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
        <div id="back-to-top-anchor" />
        <OptionsToolbar open={open} handleDrawerToggle={handleDrawerToggle} />
        <Content />
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

        <Filterbar />
      </Drawer>

      <ScrollHandler {...props} scrollTop={true}>
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
            style={{ paddingRight: 20 }}
            onClick={handleDrawerToggle}
          >
            <Typography variant="button">Filters</Typography>
          </Button>
        </ScrollHandler>
      )}
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
