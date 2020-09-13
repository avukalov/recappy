import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Grid, Typography } from '@material-ui/core';

import SearchNav from '../search/SearchNav';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    background:
      'linear-gradient(to right bottom, rgba(254, 107, 139, 1) 0%, rgba(254, 107, 139, 0.45) 15%, rgba(254, 107, 139, 0.2) 25%, rgba(255, 255, 255, 1) 50%, rgba(255, 142, 83, 0.2) 75%, rgba(255, 142, 83, 0.45) 85%, rgba(255, 142, 83, 1) 100%)',
  },
  container: {
    height: `calc(100vh - 128px)`,
  },
  main: {
    // height: '100%',
  },
  mainBox: {
    marginTop: '10vh',
  },
  searchBox: {
    width: '60vw',
  },
  quoteBox: {
    margin: theme.spacing(4),
  },
  carousel: {
    marginTop: theme.spacing(4),
  },
  title: {
    margin: theme.spacing(-6, 0, 4, -4),
    fontSize: '8rem',
    fontFamily: 'Kaushan Script',
  },
  titleWelcome: {
    marginRight: theme.spacing(-8),
  },
  quote: {
    color: theme.palette.grey[500],
    fontFamily: 'Dancing Script, cursive',
  },
}));
const Landing = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Grid
          className={classes.main}
          container
          justify='center'
          alignItems='flex-start'
        >
          <Box className={classes.mainBox}>
            <Typography
              variant='h2'
              align='center'
              className={classes.titleWelcome}
            >
              Welcome to
            </Typography>
            <Typography
              variant='h1'
              color='secondary'
              align='center'
              className={classes.title}
            >
              Recappy
            </Typography>
            <Box className={classes.searchBox}>
              <SearchNav landing className={classes.searchBox} />
            </Box>
            <Box className={classes.quoteBox}>
              <Typography variant='h4' align='center' className={classes.quote}>
                "One cannot think well, love well, sleep well, if one has not
                dined well"
              </Typography>
              <Typography variant='h5' align='center' className={classes.quote}>
                ~ Virginia Woolf ~
              </Typography>
            </Box>
          </Box>
        </Grid>
        {/* <Grid
        container
        justify='center'
        alignItems='center'
        className={classes.carousel}
      >
        <Carousel />
      </Grid> */}
      </Container>
    </div>
  );
};

export default Landing;
