import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getSearchQueryResults } from '../../actions/search/search';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Zoom } from '@material-ui/core';

import RecipeCard from '../recipe/RecipeCard';
import OptionsToolbar from '../filter/OptionsToolbar';

const useStyles = makeStyles((theme) => ({
  loading: {
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
}));

const Content = (props) => {
  const classes = useStyles();

  const {
    search: { recipes, loading, init, submit },
    query,
    pager,
    getSearchQueryResults,
  } = props;

  useEffect(() => {
    if (init) {
      getSearchQueryResults(query, pager);
      return;
    }
    if (submit) {
      getSearchQueryResults(query, pager);
    }
    window.scrollTo(0, 0);
  }, [submit, getSearchQueryResults]);

  return (
    <div>
      <Grid
        container
        spacing={2}
        direction='row'
        justify='flex-start'
        alignItems='flex-start'
        className={classes.root}
      >
        {!loading ? (
          recipes && recipes.length !== 0 ? (
            recipes.map((recipe) => (
              <Zoom in={true} key={recipe._id}>
                <Grid key={recipe._id} item xs={12} sm={6} md={4} lg={3}>
                  <RecipeCard recipe={recipe} />
                </Grid>
              </Zoom>
            ))
          ) : (
            <div className={classes.loading}>
              <h1>No Results</h1>
            </div>
          )
        ) : (
          <div className={classes.loading}>
            <h1>Loading...</h1>
          </div>
        )}
      </Grid>

      {!loading && recipes && recipes.length !== 0 && pager.pages !== 1 && (
        <OptionsToolbar pagination />
      )}
    </div>
  );
};

Content.propTypes = {
  search: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  pager: PropTypes.object.isRequired,
  getSearchQueryResults: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
  query: state.query,
  pager: state.pager,
});

export default connect(mapStateToProps, { getSearchQueryResults })(Content);
