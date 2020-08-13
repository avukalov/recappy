import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { updateQuery, updatePager } from '../../actions/search/query';
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
  FIRST_PAGE,
} from '../../actions/types';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import ListboxComponent from '../../shared/components/VirtualizedListBox';
import usePrev from '../../hooks/usePrev';

// CSS Styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    direction: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    maxWidth: 300,
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

const Filterbar = (props) => {
  const classes = useStyles();

  const { query, filters, updateQuery, updatePager, sendQueryFilters } = props;

  const prevQuery = usePrev(query);

  useEffect(() => {
    if (prevQuery && query === prevQuery) return;
    sendQueryFilters(query);
  }, [query, sendQueryFilters, updateQuery]);

  useEffect(() => {
    return () => {
      handleOnChange(RESET_QUERY);
    };
  }, []);

  const handleOnChange = (type, value) => {
    updatePager(FIRST_PAGE);
    updateQuery(type, value);
  };

  return (
    <div className={classes.root}>
      {/* Search Recipes Form */}

      <Autocomplete
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

Filterbar.propTypes = {
  query: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  updateQuery: PropTypes.func.isRequired,
  updatePager: PropTypes.func.isRequired,
  sendQueryFilters: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  query: state.query,
  filters: state.filters,
});

export default connect(mapStateToProps, {
  updateQuery,
  updatePager,
  sendQueryFilters,
})(Filterbar);
