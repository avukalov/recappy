import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { connect } from 'react-redux';
import { getRecipeById } from '../../actions/search/search';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Divider, Box } from '@material-ui/core';
import { AccessAlarm, People, AccountBalanceWallet } from '@material-ui/icons';

import ChipsList from '../common/ChipsList';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    marginTop: theme.spacing(8),
  },
  title: {
    width: '100%',
    textAlign: 'center',
  },
  dividerVertival: {
    margin: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  listLeft: {
    textAlign: 'right',
    padding: theme.spacing(1, 0),
  },
  listRight: {
    textAlign: 'left',
    padding: theme.spacing(1, 0),
  },
  boxDetails: {
    margin: theme.spacing(0, 4),
  },
  boxTags: {
    margin: theme.spacing(0, 2),
  },
}));

const Recipe = (props) => {
  const classes = useStyles();

  const { recipe, getRecipeById } = props;

  const location = useLocation();

  useEffect(() => {
    getRecipeById(location.state._id);
  }, []);

  return (
    <div className='root'>
      <Container className={classes.container}>
        {recipe ? (
          <Grid container direction='column' alignItems='center' spacing={4}>
            <Grid item className={classes.title}>
              <Typography variant='h3'>{recipe.title}</Typography>
              <Divider />
            </Grid>

            <Grid item container justify='center'>
              <img
                src={
                  recipe.image
                    ? recipe.image
                    : require('../../shared/images/recipe-default.png')
                }
                alt={recipe.title}
              />
            </Grid>

            <Grid item container justify='center'>
              <Box
                display='flex'
                justifyContent='flex-start'
                className={classes.boxDetails}
              >
                <People fontSize='large' className={classes.icon} />
                <Typography variant='h6'>{recipe.servings}</Typography>
              </Box>
              <Box
                display='flex'
                justifyContent='flex-start'
                className={classes.boxDetails}
              >
                <AccessAlarm fontSize='large' className={classes.icon} />
                <Typography variant='h6'>
                  {recipe.readyInMinutes} mins
                </Typography>
              </Box>
              <Box
                display='flex'
                justifyContent='flex-start'
                className={classes.boxDetails}
              >
                <AccountBalanceWallet
                  fontSize='large'
                  className={classes.icon}
                />
                <Typography variant='h6'>
                  {Math.round(
                    ((recipe.pricePerServing * recipe.servings) / 100) * 100
                  ) / 100}{' '}
                  $
                </Typography>
              </Box>
            </Grid>

            <Grid item>
              <ChipsList
                size='medium'
                veryHealthy={recipe.veryHealthy}
                vegetarian={recipe.vegetarian}
                vegan={recipe.vegan}
                dairyFree={recipe.dairyFree}
              />
            </Grid>

            <Grid item container justify='flex-start'>
              <Grid item container sm={2} justify='flex-end'>
                <ul>
                  {recipe.extendedIngredients.map((ingredient, index) => (
                    <li key={index} className={classes.listLeft}>
                      <Typography
                        variant='body1'
                        style={{ textTransform: 'capitalize' }}
                      >
                        {ingredient.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Grid>
              <Divider
                flexItem
                orientation='vertical'
                className={classes.dividerVertival}
              />
              <Grid item container sm={2} justify='flex-start'>
                <ul>
                  {recipe.extendedIngredients.map((ingredient, index) => (
                    <li key={index} className={classes.listRight}>
                      <Typography
                        variant='body1'
                        // style={{ textTransform: 'capitalize' }}
                      >
                        {ingredient.amount} {ingredient.unit}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </div>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.object,
};

const mapStateToProps = (state) => ({
  recipe: state.search.currentRecipe,
});

export default connect(mapStateToProps, { getRecipeById })(Recipe);
