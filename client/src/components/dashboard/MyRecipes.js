import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Zoom, Typography, Button, Box, Table, TableBody, TableContainer, TableRow, TableCell,
        Paper, TableHead, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import RecipeCard from '../recipe/RecipeCard';

import { getUserRecipes } from '../../actions/userRecipes';
import { setRecipe } from '../../actions/recipes';
import { 
  UPDATE_RECIPE,
  RECIPE_ACTION, 
} from '../../actions/types';

const useStyles = makeStyles((theme) => ({
  loading: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(7)
  },
  rowFlexEnd: {
    display: 'flex',
    direction: 'row',
    justifyContent: 'flex-end'
  },
}));

const MyRecipes = (props) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  const { 
    recipes,
    user,
    getUserRecipes,
    setRecipe
  } = props;

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    getUserRecipes(user._id);
  }, [user._id]);

  const handleEdit = (recipe) => {
    setRecipe(RECIPE_ACTION, 'Update');
    setRecipe(UPDATE_RECIPE, recipe);
    props.changeComponent('New recipe')
  }

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
                  <TableContainer component={Paper}>
                    <Table size="small" >
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Box className={classes.rowFlexEnd}>
                              <IconButton onClick={() => handleEdit(recipe)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton>
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell padding="none">
                            <RecipeCard recipe={recipe} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
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

export default connect(mapStateToProps, 
  { getUserRecipes,
    setRecipe })(MyRecipes);
