import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Zoom, Typography } from '@material-ui/core';

import RecipeCard from '../recipe/RecipeCard';

const useStyles = makeStyles((theme) => ({
  loading: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '100px'
  },
}));

const Favorites = (props) => {
  const classes = useStyles();

  const {
    recipes : { favorites, emptyFavorites }
  } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);


  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        className={classes.root}
      >
        {!loading ? (
          !emptyFavorites ? (
            Object.values(favorites).map((recipe) => (
              (recipe.favorite === true ?
              <Zoom in={true} key={recipe.recipe._id}>
                <Grid key={recipe.recipe._id} item xs={12} sm={6} md={4} lg={3}>
                  <RecipeCard recipe={recipe.recipe} />
                </Grid>
              </Zoom>
              : null ) ))
          ) : (
            <div className={classes.loading}>
              <Typography variant="h5">You don't have favorite recipes :( </Typography>
            </div>
          )
        ) : (
          <div className={classes.loading}>
            <h1>Loading...</h1>
          </div>
        )}
      </Grid>

      {/* {!loading && pager.pages !== 1 && <OptionsToolbar pagination />} */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipes: state.userRecipes
});

export default connect(mapStateToProps, { })(Favorites);
