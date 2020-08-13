import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import { connect } from 'react-redux';
import { TEXT } from '../../actions/types';
import { updateQuery } from '../../actions/search/query';

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
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
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
    // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
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
    updateQuery,
  } = props;

  const history = useHistory();
  const [formData, setFormData] = useState('');

  useEffect(() => {
    setFormData(text);
  }, [text]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData !== '') {
      updateQuery(TEXT, formData.trim());
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
      {/* <div className={classes.searchIcon}>
        <Search />
      </div> */}
      <form onSubmit={onSubmit}>
        <InputBase
          placeholder="Chicken in American way"
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
        color="primary"
        variant="contained"
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
  updateQuery: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  query: state.query,
});

export default connect(mapStateToProps, { updateQuery })(Searchbar);
