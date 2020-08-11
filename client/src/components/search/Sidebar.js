import React from 'react';
import { updateQuery } from '../../actions/search/query';
import { connect } from 'react-redux';
import { sendQueryFilters } from '../../actions/search/recipes';

import PropTypes from 'prop-types';

import {
  INCLUDED_INGREDIENTS,
  EXCLUDED_INGREDIENTS,
  CUISINES,
  DISH_TYPES,
  DIETS,
  OCCASIONS,
  RESET_QUERY,
} from '../../actions/types';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, TextField, Button, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import ListboxComponent from '../../shared/components/VirtualizedListBox';

import { useEffect } from 'react';

// CSS Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  input: {
    margin: theme.spacing(0, 0, 2),
  },
  chip: {
    color: 'black',
    textTransform: 'capitalize',
    margin: theme.spacing(0.2, 0.2, 0.5, 0),
    background:
      'linear-gradient(45deg, rgb(254, 107, 139, 0.85) 30%, rgb(255, 142, 83, 0.85) 90%)',
  },
  listbox: {
    textTransform: 'capitalize',
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
}));

const Sidebar = ({ query, filters, updateQuery, sendQueryFilters }) => {
  const classes = useStyles();

  useEffect(() => {
    sendQueryFilters(query);
  }, [query, sendQueryFilters]);

  const handleOnChange = (type, value) => {
    updateQuery(type, value);
  };

  return (
    <div className={classes.root}>
      {/* Search Recipes Form */}
      <form className={classes.form} noValidate>
        <Autocomplete
          fullWidth
          multiple
          className={classes.input}
          value={query.includedIngredients}
          getOptionLabel={(option) => option}
          getOptionSelected={(option) =>
            query.includedIngredients.includes(option)
          }
          options={filters.includedIngredients}
          ListboxComponent={ListboxComponent}
          ListboxProps={{ className: classes.listbox }}
          ChipProps={{ size: 'small', className: classes.chip }}
          onChange={(e, value) => {
            handleOnChange(INCLUDED_INGREDIENTS, value);
          }}
          renderOption={(option) => <Typography noWrap>{option}</Typography>}
          renderInput={(params) => (
            <TextField
              {...params}
              color="secondary"
              variant="outlined"
              label="Included Ingredients"
              InputProps={{ ...params.InputProps }}
            />
          )}
        />
        <Autocomplete
          fullWidth
          multiple
          className={classes.input}
          value={query.excludedIngredients}
          getOptionLabel={(option) => option}
          getOptionSelected={(option) =>
            query.excludedIngredients.includes(option)
          }
          options={filters.excludedIngredients}
          ListboxComponent={ListboxComponent}
          ListboxProps={{ className: classes.listbox }}
          ChipProps={{ size: 'small', className: classes.chip }}
          onChange={(e, value) => {
            handleOnChange(EXCLUDED_INGREDIENTS, value);
          }}
          renderOption={(option) => <Typography noWrap>{option}</Typography>}
          renderInput={(params) => (
            <TextField
              {...params}
              color="secondary"
              variant="outlined"
              label="Excluded Ingredients"
              InputProps={{ ...params.InputProps }}
            />
          )}
        />
        <Autocomplete
          fullWidth
          multiple
          className={classes.input}
          value={query.cuisines}
          getOptionLabel={(option) => option}
          options={filters.cuisines}
          ListboxComponent={ListboxComponent}
          ListboxProps={{ className: classes.listbox }}
          ChipProps={{ size: 'small', className: classes.chip }}
          onChange={(e, value) => {
            handleOnChange(CUISINES, value);
          }}
          renderOption={(option) => <Typography noWrap>{option}</Typography>}
          renderInput={(params) => (
            <TextField
              {...params}
              color="secondary"
              variant="outlined"
              label="Cuisines"
              InputProps={{ ...params.InputProps }}
            />
          )}
        />
        <Autocomplete
          fullWidth
          multiple
          className={classes.input}
          value={query.dishTypes}
          getOptionLabel={(option) => option}
          options={filters.dishTypes}
          ListboxComponent={ListboxComponent}
          ListboxProps={{ className: classes.listbox }}
          ChipProps={{ size: 'small', className: classes.chip }}
          onChange={(e, value) => {
            handleOnChange(DISH_TYPES, value);
          }}
          renderOption={(option) => <Typography noWrap>{option}</Typography>}
          renderInput={(params) => (
            <TextField
              {...params}
              color="secondary"
              variant="outlined"
              label="Dish types"
              InputProps={{ ...params.InputProps }}
            />
          )}
        />
        <Autocomplete
          fullWidth
          multiple
          className={classes.input}
          value={query.diets}
          getOptionLabel={(option) => option}
          options={filters.diets}
          ListboxComponent={ListboxComponent}
          ListboxProps={{ className: classes.listbox }}
          ChipProps={{ size: 'small', className: classes.chip }}
          onChange={(e, value) => {
            handleOnChange(DIETS, value);
          }}
          renderOption={(option) => <Typography noWrap>{option}</Typography>}
          renderInput={(params) => (
            <TextField
              {...params}
              color="secondary"
              variant="outlined"
              label="Diets"
              InputProps={{ ...params.InputProps }}
            />
          )}
        />
        <Autocomplete
          fullWidth
          multiple
          className={classes.input}
          value={query.occasions}
          getOptionLabel={(option) => option}
          options={filters.occasions}
          ListboxComponent={ListboxComponent}
          ListboxProps={{ className: classes.listbox }}
          ChipProps={{ size: 'small', className: classes.chip }}
          onChange={(e, value) => {
            handleOnChange(OCCASIONS, value);
          }}
          renderOption={(option) => <Typography noWrap>{option}</Typography>}
          renderInput={(params) => (
            <TextField
              {...params}
              color="secondary"
              variant="outlined"
              label="Occasions"
              InputProps={{ ...params.InputProps }}
            />
          )}
        />
      </form>

      <Toolbar />

      {/* Bottom buttons */}
      <Button
        variant="contained"
        color="secondary"
        onClick={(e) => {
          handleOnChange(RESET_QUERY);
        }}
      >
        Clear
      </Button>
    </div>
  );
};

Sidebar.propTypes = {
  query: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  updateQuery: PropTypes.func.isRequired,
  sendQueryFilters: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  query: state.query,
  filters: state.filters,
});

export default connect(mapStateToProps, {
  updateQuery,
  sendQueryFilters,
})(Sidebar);
