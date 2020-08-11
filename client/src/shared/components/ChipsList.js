import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Chip, Typography } from '@material-ui/core';
import {
  SentimentSatisfiedAlt,
  SentimentVeryDissatisfied,
} from '@material-ui/icons';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: theme.spacing(0.5),
  },
  chip: {
    color: 'black',
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: 'capitalize',
  },
  healthy: {
    color: 'white',
    backgroundColor: theme.palette.success.main,
    padding: theme.spacing(1, 0),
  },
  unhealthy: {
    color: 'white',
    backgroundColor: theme.palette.grey[800],
    padding: theme.spacing(1, 0),
  },
  icon: {
    color: 'white',
  },
}));

const ChipsList = ({ veryHealthy }) => {
  const classes = useStyles();

  let chip;

  veryHealthy
    ? (chip = (
        <Chip
          size="small"
          icon={<SentimentSatisfiedAlt className={classes.icon} />}
          label={<Typography variant="body2">Healthy</Typography>}
          className={classes.healthy}
        />
      ))
    : (chip = (
        <Chip
          size="small"
          icon={<SentimentVeryDissatisfied className={classes.icon} />}
          label={<Typography variant="body2">Unhealthy</Typography>}
          className={classes.unhealthy}
        />
      ));
  return <Fragment>{chip}</Fragment>;
};
ChipsList.propTypes = {
  veryHealthy: PropTypes.bool,
};

export default ChipsList;
