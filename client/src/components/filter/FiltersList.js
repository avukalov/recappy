import React, { useState, memo } from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';
import { updateQuery } from '../../actions/search/query';

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

  const { filter, type, updateQuery } = props;
  const [state, setState] = useState({});

  const handleChange = (event) => {
    let temp = { ...state, [event.target.name]: event.target.checked };
    console.log(temp);
    setState(temp);
    updateQuery(type, objectToArray(temp));
  };

  return (
    <List className={classes.root}>
      {filter.map((value) => {
        return (
          <ListItem key={value} disableGutters className={classes.listItem}>
            <FormControlLabel
              className={classes.formControl}
              control={
                <Checkbox
                  size="small"
                  checked={state.value}
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
      })}
    </List>
  );
};

FiltersList.propTypes = {
  filter: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  updateQuery: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default memo(connect(mapStateToProps, { updateQuery })(FiltersList));
