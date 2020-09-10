import React, { useEffect, useState } from 'react';

import api from '../../utils/api';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Zoom, Typography, Button } from '@material-ui/core';

import RecipeCard from '../recipe/RecipeCard';
//import OptionsToolbar from '../filter/OptionsToolbar';

const useStyles = makeStyles((theme) => ({
  loading: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const MyRecipes = (props) => {
  const classes = useStyles();

  const { _id } = props.user;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    try {
      api.get(`/recipe/userRecipes/${_id}`, {headers: { "Content-Type": "application/json" }})
      .then(res => {
          setRecipes(res.data)
      })
  } catch(err){
      console.log(err);
  }
  }, [_id])


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
              <Typography variant="h5">You haven't created any recipes yet.</Typography>
              <Typography variant="h5">Let's change that!</Typography>
              <Button variant="contained" color="secondary" onClick={() => props.changeComponent('New recipe')}>Create recipe</Button>
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

export default MyRecipes;