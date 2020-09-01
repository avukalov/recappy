import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import { connect } from 'react-redux';
import { TEXT, SUBMIT } from '../../actions/types';
import { setQuery } from '../../actions/search/query';

import PropTypes from 'prop-types';

import { fade, makeStyles } from '@material-ui/core/styles';
import { InputBase, Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    margin: theme.spacing(0, 2),
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '45ch',
      '&:focus': {
        width: '60ch',
      },
    },
  },
  searchButton: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.spacing(0, 0.5, 0.5, 0),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    // backgroundColor: fade(theme.palette.primary.main, 0.35),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.primary.main, 0.55),
    // },
  },
}));

const Searchbar = (props) => {
  const classes = useStyles();

  const {
    query: { text },
    setQuery,
  } = props;

  const history = useHistory();
  const [formData, setFormData] = useState('');

  useEffect(() => {
    setFormData(text);
  }, [text]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData !== '') {
      setQuery(TEXT, formData.trim());
      setQuery(SUBMIT);
    }

    history.push('/search');
  };

  const onChange = (e) => {
    let value = e.target.value;

    value = value.replace(/[^A-Za-z' ]/gi, '');

    setFormData(value);
  };

  return (
    <div className={classes.search}>
      <form onSubmit={onSubmit}>
        <InputBase
          placeholder='Chicken in American way'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={formData}
          inputProps={{ 'aria-label': 'search' }}
          onChange={onChange}
        />
      </form>
      <Button
        color='primary'
        variant='contained'
        startIcon={<Search />}
        disableElevation
        className={classes.searchButton}
        onClick={onSubmit}
      >
        Search
      </Button>
    </div>
  );
};

Searchbar.propTypes = {
  query: PropTypes.object.isRequired,
  setQuery: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  query: state.query,
});

export default connect(mapStateToProps, { setQuery })(Searchbar);
