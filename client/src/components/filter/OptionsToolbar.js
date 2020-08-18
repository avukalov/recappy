import React from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';

import { Tune } from '@material-ui/icons';

import Pagination from './Pagination';
import SortBy from './SortBy';

const useStyles = makeStyles((theme) => ({
  root: {},
  rootAbsolute: {
    position: 'absolute',
    top: 66,
    zIndex: theme.zIndex.appBar + 200,
    backgroundColor: theme.palette.background.paper,
  },
  toolbarFilterSort: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  toolbarPagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  item: {
    marginRight: theme.spacing(2),
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  justifySpaceStart: {
    justifyContent: 'flex-start',
  },
  justifyCenter: {},
}));

const OptionsToolbar = (props) => {
  const classes = useStyles();

  const { filtering, pagination, handleFilterToggle } = props;

  const renderFilter = (
    <div className={classes.rootAbsolute}>
      <div className={classes.toolbarFilterSort}>
        <Button
          disableRipple
          startIcon={<Tune />}
          className={classes.item}
          onClick={handleFilterToggle}
        >
          Filter
        </Button>
        <SortBy />
      </div>
    </div>
  );

  const renderPagination = (
    <div className={classes.toolbarPagination}>
      <Pagination />
    </div>
  );
  return (
    <div className={classes.root}>
      {filtering && renderFilter}
      {pagination && renderPagination}
    </div>
  );
};

OptionsToolbar.propTypes = {
  filter: PropTypes.bool,
  pagination: PropTypes.bool,
  handleFilterToggle: PropTypes.func,
};

export default OptionsToolbar;
