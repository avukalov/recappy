import React, { useState, memo } from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';

import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Favorite, Share, AccessAlarm, People } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { updateUserFavorites } from '../../actions/userRecipes';

import ChipsList from '../common/ChipsList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
  },
  rowFlexStart: {
    display: 'flex',
    direction: 'row',
    justifyContent: 'flex-start',
  },
  rowSpaceBetween: {
    display: 'flex',
    direction: 'row',
    justifyContent: 'space-between',
  },
  rowFlexEnd: {
    display: 'flex',
    direction: 'row',
    justifyContent: 'flex-end'
  },
  cardContentTitle: {
    padding: theme.spacing(2, 2, 1),
  },
  cardContent: {
    padding: theme.spacing(1, 2),
  },
  cardAction: {
    width: '100%',
    display: 'flex',
    direction: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    display: 'flex',
    direction: 'row',
    alignItems: 'center',
    marginRight: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const RecipeCard = (props) => {
  const classes = useStyles();

  const {
    recipe: { _id, title, image, readyInMinutes, servings, veryHealthy },
    favorites,
    user,
    updateUserFavorites
  } = props;

  const history = useHistory();
  const [value, setValue] = useState(2);

  const handleOnClick = () => {
    history.push(`/recipe/${_id}`, { _id: _id });
  };


  // added - favorites

  const handleAuthorized = () => {
    let newFavorite;
    if ( favorites[_id] ) {
      const { favorite, recipe } = favorites[_id];
      favorites[_id] = { "favorite" : !favorite, recipe }
    }
    else {
      newFavorite = { "favorite": true, recipe: { _id, title, image, readyInMinutes, servings, veryHealthy }};
      favorites[_id] = newFavorite;
    }

    updateUserFavorites(user._id, favorites);
  }

  const handleUnauthorized = () => {
    console.log('You need to log in to add this recipe to favorites')
  }


  return (
    <Card className={classes.root}>
      {/* <Box className={classes.rowFlexEnd}>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Box> */}
      <CardActionArea onClick={handleOnClick}>
        <CardMedia
          className={classes.media}
          image={
            image ? image : require('../../shared/images/recipe-default.png')
          }
          title={title}
        />
      </CardActionArea>

      <CardContent className={classes.cardContentTitle}>
        <Box width='100%'>
          <Typography display='block' noWrap>
            {title}
          </Typography>
        </Box>
      </CardContent>
      <CardContent className={classes.cardContent}>
        <Box className={classes.rowSpaceBetween}>
          <Box className={classes.rowFlexStart}>
            <Box className={classes.item}>
              <AccessAlarm fontSize='small' className={classes.icon} />
              <Typography variant='body2'>{readyInMinutes} mins</Typography>
            </Box>
            <Box className={classes.item}>
              <People className={classes.icon} />
              <Typography variant='body2'>{servings}</Typography>
            </Box>
          </Box>
          <Box>
            <ChipsList size='small' veryHealthy={veryHealthy} />
          </Box>
        </Box>
      </CardContent>

      <CardActions disableSpacing>
        <Box className={classes.cardAction}>
          <Box>
            <Rating
              name='simple-controlled'
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>
          <Box>
            <IconButton aria-label='share'>
              <Share />
            </IconButton>
            <IconButton  onClick={user ? (() => handleAuthorized()) : (() => handleUnauthorized())}
                         aria-label='add to favorites'
                         color={favorites[_id] ? (favorites[_id].favorite ? 'secondary' : 'default') : 'default'}
                >
              <Favorite />
            </IconButton>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  favorites: state.userRecipes.favorites,
  user: state.auth.user
});

export default connect(mapStateToProps, { updateUserFavorites })(memo(RecipeCard));
