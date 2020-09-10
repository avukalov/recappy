import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getCarouselData } from '../../actions/utils/carousel';

import { makeStyles } from '@material-ui/core/styles';
import {
  NavigateBefore,
  NavigateNext,
  FiberManualRecord,
} from '@material-ui/icons';
import { IconButton, Container, Box, Grid } from '@material-ui/core';

import RecipeCard from '../recipe/RecipeCardLanding';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    marginRight: theme.spacing(4),
  },
}));

function Carousel(props) {
  const classes = useStyles();
  const { carousel, getCarouselData } = props;
  const { items, query, currentPage, itemsPerPage, loading, pages } = carousel;

  const [current, setCurrent] = useState([]);

  const initList = () => {
    const list = items.slice(currentPage, currentPage + itemsPerPage);
    setCurrent(list);
  };

  const handlePrev = () => {};

  const handleNext = () => {};

  useEffect(() => {
    initList();
  }, [items]);

  useEffect(() => {
    getCarouselData(carousel);
  }, [query]);

  return (
    <>
      {/* <Grid
      container
      spacing={2}
      direction='row'
      justify='flex-start'
      alignItems='center'
      className={classes.root}
    > */}
      {current.length !== 0 &&
        current.map((item, index) => (
          <Grid item key={index} sm={3} className={classes.card}>
            <RecipeCard recipe={item} />
          </Grid>
        ))}
      {/* </Grid> */}
    </>
  );
}

Carousel.propTypes = {
  carousel: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  carousel: state.carousel,
});

export default connect(mapStateToProps, { getCarouselData })(Carousel);
