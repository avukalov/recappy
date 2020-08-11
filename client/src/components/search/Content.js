import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

// Material-UI Components
import { Zoom, Grid, makeStyles } from '@material-ui/core';

// Components
import RecipeCard from '../recipe/RecipeCard';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },

  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    // transform: 'translate(-50%, -50%)',
  },
}));
const Content = ({ recipes: { recipes, loading } }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        className={classes.root}
      >
        {!loading ? (
          recipes.map((recipe) => (
            <Zoom in={true} key={recipe._id}>
              <Grid item xs={12} md={6} lg={3}>
                <RecipeCard recipe={recipe} />
              </Grid>
            </Zoom>
          ))
        ) : (
          <div className={classes.loading}>
            <h1>Loading...</h1>
          </div>
        )}
      </Grid>
    </Fragment>
  );
};

Content.propTypes = {
  recipes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.recipes,
});

export default connect(mapStateToProps, {})(Content);
