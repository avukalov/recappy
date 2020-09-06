import React, { useEffect } from 'react';
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
} from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: theme.spacing(0, 0, 1, 1),
  },
  form: {
    padding: theme.spacing(1),
  },
}));

const SearchNav = (props) => {
  const classes = useStyles();

  const {
    query: { text },
    setQuery,
  } = props;

  const history = useHistory();
  const [formData, setFormData] = useState('');

  useEffect(() => {
    setFormData(text);
  }, [text, formData]);

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

  return (
    <Container maxWidth='md'>
      <Paper elevation={5} className={classes.paper}>
        <form onSubmit={onSubmit} className={classes.form}>
          <TextField
            fullWidth
            color='secondary'
            value={formData}
            variant='outlined'
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
        </form>
      </Paper>
    </Container>
  );
};

SearchNav.propTypes = {
  query: PropTypes.object.isRequired,
  setQuery: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  query: state.query,
});

export default connect(mapStateToProps, { setQuery })(SearchNav);
