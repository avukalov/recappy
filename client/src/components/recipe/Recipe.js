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
  image: {
    height: '370px',
    width: '556px',
  },
  dividerVertival: {
    margin: theme.spacing(2),
  },
  dividerHorizontal: {
    margin: theme.spacing(2, 0),
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
  summary: {
    fontSize: 20,
  },
  step: {
    margin: theme.spacing(4, 0),
  },
}));

const Recipe = (props) => {
  const classes = useStyles();

  const { recipe, getRecipeById } = props;

  const location = useLocation();

  useEffect(() => {
    getRecipeById(location.state._id);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='root'>
      <Container className={classes.container}>
        {recipe ? (
          <Grid container direction='column' alignItems='center' spacing={6}>
            <Grid item className={classes.title}>
              <Typography variant='h3'>{recipe.title}</Typography>
              <Divider />
            </Grid>

            <Grid item container justify='center'>
              <img
                className={classes.image}
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

<<<<<<< HEAD
            <Grid item container justify='flex-start'>
              <Grid item container sm={4} justify='flex-end'>
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
=======
            <Grid item container justify='center'>
              <Grid item sm={10}>
                <Grid item sm={12}>
                  <Typography variant='h4' align='center'>
                    Summary
                  </Typography>
                  <Divider className={classes.dividerHorizontal} />
                </Grid>
                <Typography align='center'>
                  <div
                    className={classes.summary}
                    dangerouslySetInnerHTML={{ __html: recipe.summary }}
                  />
                </Typography>
>>>>>>> 36baceb63244f6ca58be7546d3febd3992fc3f18
              </Grid>
            </Grid>

            <Grid item container sm={6} justify='center'>
              <Grid item sm={12}>
                <Typography variant='h4' align='center'>
                  Ingredients
                </Typography>
                <Divider className={classes.dividerHorizontal} />
              </Grid>

              <Grid
                item
                container
                justify='center'
                style={{ paddingRight: 150 }}
              >
                <Grid item>
                  <ul>
                    {recipe.extendedIngredients.map((ingredient, index) => (
                      <li key={index} className={classes.listLeft}>
                        <Typography
                          variant='h6'
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
                <Grid item>
                  <ul>
                    {recipe.extendedIngredients.map((ingredient, index) => (
                      <li key={index} className={classes.listRight}>
                        <Typography variant='h6'>
                          {Math.round(
                            (ingredient.amount + Number.EPSILON) * 100
                          ) / 100}{' '}
                          {ingredient.unit}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Grid>
              </Grid>
            </Grid>

            <Grid item container justify='center'>
              <Grid item sm={6}>
                <Typography variant='h4' align='center'>
                  Instructions
                </Typography>
                <Divider className={classes.dividerHorizontal} />
              </Grid>
              <Grid item sm={10}>
                {recipe.analyzedInstructions[0].steps.map((step, index) => (
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
