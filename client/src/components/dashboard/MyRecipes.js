import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { connect } from 'react-redux';
=======

import api from '../../utils/api';
>>>>>>> 88e673ef39fc7717a6eb35976bc293a8049577f9

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Zoom, Typography, Button } from '@material-ui/core';

import RecipeCard from '../recipe/RecipeCard';
<<<<<<< HEAD

import { getUserRecipes } from '../../actions/userRecipes';
=======
//import OptionsToolbar from '../filter/OptionsToolbar';
>>>>>>> 88e673ef39fc7717a6eb35976bc293a8049577f9

const useStyles = makeStyles((theme) => ({
  loading: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
<<<<<<< HEAD
    justifyContent: 'space-between',
    marginTop: theme.spacing(7)
=======
    justifyContent: 'center',
>>>>>>> 88e673ef39fc7717a6eb35976bc293a8049577f9
  },
}));

const MyRecipes = (props) => {
  const classes = useStyles();

<<<<<<< HEAD
  const [loading, setLoading] = useState(true);

  const { 
    recipes,
    user,
    getUserRecipes
  } = props;
=======
  const { _id } = props.user;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
>>>>>>> 88e673ef39fc7717a6eb35976bc293a8049577f9

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
<<<<<<< HEAD
    getUserRecipes(user._id);
  }, [user._id]);
=======
    try {
      api.get(`/recipe/userRecipes/${_id}`, {headers: { "Content-Type": "application/json" }})
      .then(res => {
          setRecipes(res.data)
      })
  } catch(err){
      console.log(err);
  }
  }, [_id])

>>>>>>> 88e673ef39fc7717a6eb35976bc293a8049577f9

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
<<<<<<< HEAD
              <Typography style={{padding: 7}} variant="h5">You haven't created any recipes yet.</Typography>
              <Typography style={{padding: 7}} variant="h5">Let's change that!</Typography>
              <Button style={{padding: 7}} variant="contained" color="secondary" onClick={() => props.changeComponent('New recipe')}>Create recipe</Button>
=======
              <Typography variant="h5">You haven't created any recipes yet.</Typography>
              <Typography variant="h5">Let's change that!</Typography>
              <Button variant="contained" color="secondary" onClick={() => props.changeComponent('New recipe')}>Create recipe</Button>
>>>>>>> 88e673ef39fc7717a6eb35976bc293a8049577f9
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

<<<<<<< HEAD
const mapStateToProps = (state) => ({
  recipes: state.userRecipes.recipes,
  user: state.auth.user
});

export default connect(mapStateToProps, { getUserRecipes })(MyRecipes);
=======
export default MyRecipes;
>>>>>>> 88e673ef39fc7717a6eb35976bc293a8049577f9
