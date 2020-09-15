import React from 'react';
import { isUndefined, isEmpty } from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  step: {
    margin: theme.spacing(4, 0),
  },
}));

function Instructions(props) {
  const classes = useStyles();

  const { instructions, analyzedInstructions } = props;

  if (!isUndefined(analyzedInstructions) && !isEmpty(analyzedInstructions)) {
    return (
      <>
        {analyzedInstructions &&
          analyzedInstructions[0].steps.map((step, index) => (
            <Grid item key={index} className={classes.step}>
              <Typography
                variant='h6'
                align='center'
                color='primary'
                style={{ fontWeight: 'bold' }}
              >
                {index + 1}. Step
              </Typography>
              <Typography variant='h6' align='center'>
                {step.step}
              </Typography>
            </Grid>
          ))}
      </>
    );
  }

  if (!isUndefined(instructions)) {
    return (
      <>
        {instructions.map((step, index) => (
          <Grid item key={index} className={classes.step}>
            <Typography
              variant='h6'
              align='center'
              color='primary'
              style={{ fontWeight: 'bold' }}
            >
              {index + 1}. Step
            </Typography>
            <Typography variant='h6' align='center'>
              {step}
            </Typography>
          </Grid>
        ))}
      </>
    );
  }
}

export default Instructions;
