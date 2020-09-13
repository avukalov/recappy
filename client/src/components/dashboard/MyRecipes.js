import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Zoom, Typography, Button } from '@material-ui/core';

import RecipeCard from '../recipe/RecipeCard';

import { getUserRecipes } from '../../actions/userRecipes';

const useStyles = makeStyles((theme) => ({
  loading: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(7)
  },
}));

const MyRecipes = (props) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  const { 
    recipes,
    user,
    getUserRecipes
  } = props;

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    getUserRecipes(user._id);
  }, [user._id]);

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
           recipes.length !== 0 ? (
            recipes.map((recipe) => (
              <Zoom in={true} key={recipe._id}>
                <Grid key={recipe._id} item xs={12} sm={6} md={4} lg={3}>
                  <RecipeCard recipe={recipe} />
                </Grid>
              </Zoom>
            ))
          ) : (
            <div className={classes.loading}>
              <Typography style={{padding: 7}} variant="h5">You haven't created any recipes yet.</Typography>
              <Typography style={{padding: 7}} variant="h5">Let's change that!</Typography>
              <Button style={{padding: 7}} variant="contained" color="secondary" onClick={() => props.changeComponent('New recipe')}>Create recipe</Button>
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
  recipes: state.userRecipes.recipes,
  user: state.auth.user
});

export default connect(mapStateToProps, { getUserRecipes })(MyRecipes);
