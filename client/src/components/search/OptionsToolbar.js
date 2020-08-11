import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Sort, Tune } from '@material-ui/icons';

import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
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
}));

const OptionsToolbar = (props) => {
  const classes = useStyles();

  const { open, handleDrawerToggle } = props;

  return (
    <div className={classes.toolbar}>
      <Button startIcon={<Sort />}>
        <Typography variant="button">Sort by</Typography>
      </Button>
      <Button
        disableRipple
        startIcon={<Tune />}
        onClick={handleDrawerToggle}
        className={clsx({
          [classes.hide]: open,
        })}
      >
        <Typography variant="button">Filters</Typography>
      </Button>
    </div>
  );
};

OptionsToolbar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default OptionsToolbar;
