import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { sendQueryRecipes } from '../../actions/search/recipes';

import PropTypes from 'prop-types';

// Material-UI Components
import { makeStyles } from '@material-ui/core/styles';
import {
  // Zoom,
  Grid,
} from '@material-ui/core';

// Components
import RecipeCard from '../recipe/RecipeCard';
import OptionsToolbar from '../common/OptionsToolbar';

import usePrev from '../../hooks/usePrev';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
}));

const Content = (props) => {
  const classes = useStyles();

  const {
    recipes: { recipes, loading },
    query,
    pager,
    sendQueryRecipes,
  } = props;

  const prevPager = usePrev(pager);
  const prevQuery = usePrev(query);

  useEffect(() => {
    // console.log('pager', pager);
    // console.log('prevPager', prevPager);

    if (
      prevPager &&
      query === prevQuery &&
      pager.currentPage === prevPager.currentPage
    )
      return;

    sendQueryRecipes(query, pager);
  }, [query, pager, prevPager, prevQuery, sendQueryRecipes]);

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
            // <Zoom in={true} key={recipe._id}>
            <Grid key={recipe._id} item xs={12} sm={6} md={4} lg={3}>
              <RecipeCard recipe={recipe} />
            </Grid>
            // </Zoom>
          ))
        ) : (
          <div className={classes.loading}>
            <h1>Loading...</h1>
          </div>
        )}
      </Grid>
      {!loading && <OptionsToolbar pagination />}
    </Fragment>
  );
};

Content.propTypes = {
  recipes: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  pager: PropTypes.object.isRequired,
  sendQueryRecipes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  query: state.query,
  pager: state.pager,
});

export default connect(mapStateToProps, { sendQueryRecipes })(Content);
