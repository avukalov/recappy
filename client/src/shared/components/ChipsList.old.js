import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Chip, Typography } from '@material-ui/core';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
    color: 'black',
    background:
      'linear-gradient(45deg, rgb(254, 107, 139, 0.85) 30%, rgb(255, 142, 83, 0.85) 90%)',
  },
  label: {
    textTransform: 'capitalize',
  },
}));

const ChipsList = ({ cuisines, dishTypes, diets, occasions }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {cuisines
        ? cuisines.map((item) => (
            <li key={item}>
              <Chip
                clickable
                label={
                  <Typography variant="body1" className={classes.label}>
                    {item}
                  </Typography>
                }
                className={classes.chip}
              />
            </li>
          ))
        : null}
      {dishTypes
        ? dishTypes.map((item) => (
            <li key={item}>
              <Chip
                clickable
                label={
                  <Typography variant="body1" className={classes.label}>
                    {item}
                  </Typography>
                }
                className={classes.chip}
              />
            </li>
          ))
        : null}
      {diets
        ? diets.map((item) => (
            <li key={item}>
              <Chip
                clickable
                label={
                  <Typography variant="body1" className={classes.label}>
                    {item}
                  </Typography>
                }
                className={classes.chip}
              />
            </li>
          ))
        : null}
      {occasions
        ? occasions.map((item) => (
            <li key={item}>
              <Chip
                clickable
                label={
                  <Typography variant="body1" className={classes.label}>
                    {item}
                  </Typography>
                }
                className={classes.chip}
              />
            </li>
          ))
        : null}
    </div>
  );
};

ChipsList.propTypes = {
  cuisines: PropTypes.array,
  dishTypes: PropTypes.array,
  diets: PropTypes.array,
  occasions: PropTypes.array,
};

export default ChipsList;
