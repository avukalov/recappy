import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant='body1' color='textSecondary'>
      {'Copyright © '}
      <Link to='/' color='inherit'>
        Recappy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    direction: 'column',
    background: 'transparent',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: '-64px',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
