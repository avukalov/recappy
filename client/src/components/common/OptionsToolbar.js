import React from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Sort, Tune } from '@material-ui/icons';

import PaginationComponent from './Pagination';

const useStyles = makeStyles((theme) => ({
  hide: {
    display: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
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
  justifyCenter: {
    justifyContent: 'center',
  },
}));

const OptionsToolbar = (props) => {
  const classes = useStyles();

  const { sort, filter, pagination, open, handleFilterToggle } = props;

  const renderFilter = (
    <Button
      disableRipple
      startIcon={<Tune />}
      className={classes.item}
      onClick={handleFilterToggle}
    >
      <Typography variant="button">Filter</Typography>
    </Button>
  );

  const renderSort = (
    <Button startIcon={<Sort />} className={classes.item}>
      <Typography variant="button">Sort by</Typography>
    </Button>
  );

  const renderPagination = (
    <div
      className={clsx({
        [classes.hide]: open,
      })}
    >
      <PaginationComponent />
    </div>
  );
  return (
    <div
      className={clsx(classes.toolbar, {
        [classes.justifySpaceBetween]: sort && filter && pagination,
        [classes.justifySpaceStart]: sort && filter && !pagination,
        [classes.justifyCenter]: pagination && !sort && !filter,
        [classes.justifySpaceStart]: open,
      })}
    >
      {filter && renderFilter}
      {sort && renderSort}
      {pagination && renderPagination}
    </div>
  );
};

OptionsToolbar.propTypes = {
  sort: PropTypes.bool,
  filter: PropTypes.bool,
  pagination: PropTypes.bool,
  open: PropTypes.bool,
  handleFilterToggle: PropTypes.func,
};

export default OptionsToolbar;
