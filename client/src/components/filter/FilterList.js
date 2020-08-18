import React, { useState, memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { setQuery, setPager } from '../../actions/search/query';

import { RESET_PAGER } from '../../actions/types';

import PropTypes from 'prop-types';

import { fade, makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 342,
    width: '100%',
    overflowY: 'auto',
    marginTop: theme.spacing(2),
    backgroundColor: fade(theme.palette.background.paper, 0.5),
  },
  listItem: {
    padding: theme.spacing(0),
    paddingLeft: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  formControl: {
    width: '100%',
  },
  checkbox: {},
  label: {
    textTransform: 'capitalize',
  },
}));

function objectToArray(object) {
  let array = [];
  let keys = Object.keys(object);

  if (keys.length === 0) {
    return keys;
  }

  for (const key of keys) {
    if (object[key]) {
      array.push(key);
    }
  }

  return array;
}

const FiltersList = (props) => {
  const classes = useStyles();

  const { reset, type, filter, setQuery, setPager } = props;
  const [state, setState] = useState({});

  useEffect(() => {
    if (!reset) return;
    setState({});
  }, [reset]);

  useEffect(() => {
    if (Object.keys(state).length === 0) return;
    setPager(RESET_PAGER);
    setQuery(type, objectToArray(state));
  }, [state]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <List className={classes.root}>
      {filter.length !== 0 ? (
        filter.map((value) => {
          console.log('state[value]', value, state[value]);
          return (
            <ListItem key={value} disableGutters className={classes.listItem}>
              <FormControlLabel
                className={classes.formControl}
                control={
                  <Checkbox
                    size="small"
                    checked={state[value]}
                    onChange={handleChange}
                    name={value}
                  />
                }
                label={
                  <Typography variant="body2" className={classes.label}>
                    {value}
                  </Typography>
                }
              />
            </ListItem>
          );
        })
      ) : (
        <ListItem>
          <Typography variant="body2" className={classes.label}>
            No Options
          </Typography>
        </ListItem>
      )}
    </List>
  );
};

FiltersList.propTypes = {
  reset: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  filter: PropTypes.array.isRequired,
  setQuery: PropTypes.func.isRequired,
  setPager: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setQuery, setPager })(
  memo(FiltersList)
);
