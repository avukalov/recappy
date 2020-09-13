import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { connect } from 'react-redux';
import { TEXT, SUBMIT } from '../../actions/types';
import { setQuery } from '../../actions/search/query';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  InputBase,
} from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: theme.spacing(0, 0, 1, 1),
  },
  paperLanding: {
    width: '100%',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(8),
  },
  form: {
    padding: theme.spacing(1),
  },
  input: {
    fontSize: theme.spacing(1),
  },
}));

const SearchNav = (props) => {
  const classes = useStyles();

  const {
    query: { text },
    setQuery,
    landing,
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

    if (value === undefined) {
      value = '';
    }

    value = value.replace(/[^A-Za-z' ]/gi, '');

    setFormData(value);
  };

  const onClear = () => {
    if (formData !== '') {
      setFormData('');
    }
  };

  const landignInput = (
    <InputBase
      fullWidth
      autoFocus
      type='text'
      value={formData}
      onChange={onChange}
      placeholder='e.g. Chicken in American way'
      endAdornment={
        <>
          <InputAdornment position='end'>
            <IconButton onClick={onClear}>
              <Close />
            </IconButton>
          </InputAdornment>
          <InputAdornment position='end'>
            <IconButton color='primary' onClick={onSubmit}>
              <Search />
            </IconButton>
          </InputAdornment>
        </>
      }
    />
  );

  const filterInput = (
    <TextField
      fullWidth
      color='secondary'
      value={formData}
      variant={!landing ? 'outlined' : 'standard'}
      onChange={onChange}
      className={classes.input}
      placeholder='e.g. Chicken in American way'
      InputProps={{
        endAdornment: (
          <>
            <InputAdornment position='end'>
              <IconButton onClick={onClear}>
                <Close />
              </IconButton>
            </InputAdornment>
            <InputAdornment position='end'>
              <IconButton color='primary' onClick={onSubmit}>
                <Search />
              </IconButton>
            </InputAdornment>
          </>
        ),
      }}
    />
  );

  return (
    <Container maxWidth='md'>
      <Paper
        elevation={5}
        className={!landing ? classes.paper : classes.paperLanding}
      >
        <form onSubmit={onSubmit} className={classes.form}>
          {landing && landignInput}
          {!landing && filterInput}
        </form>
      </Paper>
    </Container>
  );
};

SearchNav.propTypes = {
  query: PropTypes.object.isRequired,
  setQuery: PropTypes.func.isRequired,
  landing: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  query: state.query,
});

export default connect(mapStateToProps, { setQuery })(SearchNav);
