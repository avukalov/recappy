import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setPager } from '../../actions/search/query';
import { UPDATE_SORT_BY, UPDATE_ORDER_BY } from '../../actions/types';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  Menu,
  MenuItem,
  Button,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Sort, KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: theme.zIndex.appBar + 201,
  },
  menu: {
    marginTop: theme.spacing(4),
    marginLeft: -theme.spacing(2),
  },
  menuItemText: {
    height: '100%',
    width: '100%',
  },
  text: {
    margin: theme.spacing(0, 1),
  },
}));

const SortBy = (props) => {
  const classes = useStyles();

  const { setPager } = props;

  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [orderBy, setOrderBy] = useState(-1);

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const el = document.getElementById('menu-anchor');

    setAnchorEl(el);
  }, []);

  const handleMenuToggle = (e) => {
    setOpen(!open);
  };

  const handleClose = (e) => {
    setOpen(false);
    setSortBy(e.target.id);
    setPager(UPDATE_SORT_BY, e.target.id);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleOrder = () => {
    if (orderBy === 1) {
      setOrderBy(-1);
      setPager(UPDATE_ORDER_BY, -1);
    } else {
      setOrderBy(1);
      setPager(UPDATE_ORDER_BY, 1);
    }
  };

  return (
    <div className={classes.root}>
      <Button disableRipple startIcon={<Sort />} onClick={handleMenuToggle}>
        Sort
      </Button>
      <Typography id="menu-anchor" variant="body2" className={classes.text}>
        {sortBy === 'relevance' && 'Relevance'}
        {sortBy === 'readyInMinutes' && 'Cooking time'}
        {sortBy === 'pricePerServing' && 'Pricing'}
      </Typography>

      <Menu
        keepMounted
        elevation={1}
        open={open}
        anchorEl={anchorEl}
        className={classes.menu}
        onClose={onClose}
      >
        <MenuItem
          id="relevance"
          disabled={sortBy === 'relevance'}
          onClick={handleClose}
        >
          <Typography
            id="relevance"
            variant="body2"
            className={classes.menuItemText}
          >
            Relevance
          </Typography>
        </MenuItem>
        <MenuItem
          id="readyInMinutes"
          disabled={sortBy === 'readyInMinutes'}
          onClick={handleClose}
        >
          <Typography
            id="readyInMinutes"
            variant="body2"
            className={classes.menuItemText}
          >
            Cooking time
          </Typography>
        </MenuItem>
        <MenuItem
          id="pricePerServing"
          disabled={sortBy === 'pricePerServing'}
          onClick={handleClose}
        >
          <Typography
            id="pricePerServing"
            variant="body2"
            className={classes.menuItemText}
          >
            Pricing
          </Typography>
        </MenuItem>
      </Menu>

      <IconButton onClick={handleOrder}>
        {orderBy === 1 ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </IconButton>
    </div>
  );
};

SortBy.propTypes = {
  setPager: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setPager })(memo(SortBy));
