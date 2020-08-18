import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import { Zoom, Slide } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  scrollTop: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: theme.zIndex.tooltip,
  },
  search: {
    position: 'fixed',
    top: theme.spacing(10),
    right: theme.spacing(0),
    zIndex: theme.zIndex.tooltip,
  },
}));

const ScrollHandler = (props) => {
  const { children, scrollTop, search } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (scrollTop) {
    return (
      <Zoom in={trigger}>
        <div
          role="presentation"
          onClick={handleClick}
          className={classes.scrollTop}
        >
          {children}
        </div>
      </Zoom>
    );
  }

  if (search) {
    return (
      <Slide in={trigger} direction="left">
        <div
          role="presentation"
          // onClick={handleClick}
          className={classes.search}
        >
          {children}
        </div>
      </Slide>
    );
  }
};

ScrollHandler.propTypes = {
  children: PropTypes.element.isRequired,
  scrollTop: PropTypes.bool,
  search: PropTypes.bool,
};

export default ScrollHandler;
