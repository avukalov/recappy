import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Chip, Typography } from '@material-ui/core';
import {
  SentimentSatisfiedAlt,
  SentimentVeryDissatisfied,
} from '@material-ui/icons';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: theme.spacing(1),
    padding: theme.spacing(1, 0),
    backgroundColor: theme.palette.success.main,
  },
  icon: {
    color: 'white',
  },
}));

const ChipsList = ({
  size,
  veryHealthy,
  glutenFree,
  vegetarian,
  vegan,
  dairyFree,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      {veryHealthy && (
        <Chip
          size={size}
          icon={<SentimentSatisfiedAlt className={classes.icon} />}
          label={<Typography variant='body2'>Healthy</Typography>}
          className={classes.chip}
        />
      )}
      {glutenFree && (
        <Chip
          size={size}
          icon={<SentimentSatisfiedAlt className={classes.icon} />}
          label={<Typography variant='body2'>Gluten Free</Typography>}
          className={classes.chip}
        />
      )}
      {vegetarian && (
        <Chip
          size={size}
          icon={<SentimentSatisfiedAlt className={classes.icon} />}
          label={<Typography variant='body2'>Vegetarian</Typography>}
          className={classes.chip}
        />
      )}
      {vegan && (
        <Chip
          size={size}
          icon={<SentimentSatisfiedAlt className={classes.icon} />}
          label={<Typography variant='body2'>Vegan</Typography>}
          className={classes.chip}
        />
      )}
      {dairyFree && (
        <Chip
          size={size}
          icon={<SentimentSatisfiedAlt className={classes.icon} />}
          label={<Typography variant='body2'>Diary Free</Typography>}
          className={classes.chip}
        />
      )}
    </Fragment>
  );
};
ChipsList.propTypes = {
  veryHealthy: PropTypes.bool,
};

export default ChipsList;
