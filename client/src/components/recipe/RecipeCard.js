import React, { memo } from 'react';

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

import ChipsList from '../../shared/components/ChipsList';

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

const RecipeCard = ({ recipe }) => {
  const classes = useStyles();

  const { title, image, readyInMinutes, servings, veryHealthy } = recipe;

  const [value, setValue] = React.useState(2);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={
            image ? image : require('../../shared/images/recipe-default.png')
          }
          title={title}
        />

        <CardContent className={classes.cardContentTitle}>
          <Box width="100%">
            <Typography display="block" noWrap>
              {title}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>

      <CardContent className={classes.cardContent}>
        <Box className={classes.rowSpaceBetween}>
          <Box className={classes.rowFlexStart}>
            <Box className={classes.item}>
              <AccessAlarm fontSize="small" className={classes.icon} />
              <Typography variant="body2">{readyInMinutes} mins</Typography>
            </Box>
            <Box className={classes.item}>
              <People className={classes.icon} />
              <Typography variant="body2">{servings}</Typography>
            </Box>
          </Box>
          <Box>
            <ChipsList veryHealthy={veryHealthy} />
          </Box>
        </Box>
      </CardContent>

      <CardActions disableSpacing>
        <Box className={classes.cardAction}>
          <Box>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>
          <Box>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
            <IconButton aria-label="add to favorites">
              <Favorite />
            </IconButton>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default memo(RecipeCard);
