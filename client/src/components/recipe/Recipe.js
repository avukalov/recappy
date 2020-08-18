import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Recipe = (props) => {
  const { recipe } = props;

  return <div>{recipe ? <h1>{recipe.title}</h1> : <p>Loading...</p>}</div>;
};

Recipe.propTypes = {
  recipe: PropTypes.object,
};

const mapStateToProps = (state) => ({
  recipe: state.search.currentRecipe,
});

export default connect(mapStateToProps, {})(Recipe);
