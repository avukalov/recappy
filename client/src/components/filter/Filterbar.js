import React, { useEffect } from 'react';

import _ from 'lodash';

import { connect } from 'react-redux';
import { setQuery } from '../../actions/search/query';
import { getFiltersFromResults } from '../../actions/search/search';

import PropTypes from 'prop-types';

import {
  SUBMIT,
  INCLUDED_INGREDIENTS,
  EXCLUDED_INGREDIENTS,
  CUISINES,
  DISH_TYPES,
  DIETS,
  OCCASIONS,
  RESET_SEARCH_QUERY,
} from '../../actions/types';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Add, Remove } from '@material-ui/icons';

import ListboxComponent from '../common/VirtualizedListBox';
// import FilterList from './FilterList';
import usePrev from '../../hooks/usePrev';

const initialState = {
  text: '',
  includedIngredients: [],
  excludedIngredients: [],
  cuisines: [],
  dishTypes: [],
  diets: [],
  occasions: [],
  // pricePerServing: { min: 0, max: 1000 },
  // readyInMinutes: { min: 0, max: 1000 },
};

// CSS Styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
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

  const {
    query,
    filters: { filters },
    setQuery,
    getFiltersFromResults,
  } = props;

  const prevQuery = usePrev(query);

  useEffect(() => {
    if (!_.isUndefined(prevQuery) && _.isEqual(query, prevQuery)) return;
    getFiltersFromResults(query);
  }, [query, prevQuery, getFiltersFromResults]);

  useEffect(() => {
    return () => {
      handleOnChange(RESET_SEARCH_QUERY);
    };
  }, []);

  const handleOnChange = (type, value) => {
    setQuery(type, value);
  };

  const handleReset = () => {
    setQuery(RESET_SEARCH_QUERY);
  };

  const onSubmit = () => {
    setQuery(SUBMIT);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          <Grid
            container
            item
            spacing={2}
            direction='row'
            justify='space-around'
          >
            <Grid item xs={5}>
              <Autocomplete
                multiple
                fullWidth
                value={query.includedIngredients}
                getOptionLabel={(option) => option}
                getOptionSelected={(option) =>
                  query.includedIngredients.includes(option)
                }
                options={[]}
                ListboxComponent={ListboxComponent}
                ListboxProps={{ className: classes.listbox }}
                ChipProps={{ size: 'small', className: classes.chip }}
                onChange={(e, value) => {
                  handleOnChange(INCLUDED_INGREDIENTS, value);
                }}
                renderOption={(option) => (
                  <Typography noWrap>{option}</Typography>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color='secondary'
                    variant='outlined'
                    label='Included Ingredients'
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Add />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={5}>
              <Autocomplete
                multiple
                fullWidth
                value={query.excludedIngredients}
                getOptionLabel={(option) => option}
                getOptionSelected={(option) =>
                  query.excludedIngredients.includes(option)
                }
                options={[]}
                ListboxComponent={ListboxComponent}
                ListboxProps={{ className: classes.listbox }}
                ChipProps={{ size: 'small', className: classes.chip }}
                onChange={(e, value) => {
                  handleOnChange(EXCLUDED_INGREDIENTS, value);
                }}
                renderOption={(option) => (
                  <Typography noWrap>{option}</Typography>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color='secondary'
                    variant='outlined'
                    label='Excluded Ingredients'
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Remove />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container item direction='row' spacing={2}>
            <Grid item xs>
              <Autocomplete
                multiple
                fullWidth
                value={query.cuisines}
                getOptionLabel={(option) => option}
                getOptionSelected={(option) => query.cuisines.includes(option)}
                options={filters.cuisines}
                ListboxComponent={ListboxComponent}
                ListboxProps={{ className: classes.listbox }}
                ChipProps={{ size: 'small', className: classes.chip }}
                onChange={(e, value) => {
                  handleOnChange(CUISINES, value);
                }}
                renderOption={(option) => (
                  <Typography variant='body1' noWrap>
                    {option}
                  </Typography>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color='primary'
                    variant='outlined'
                    label='Cuisines'
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs>
              <Autocomplete
                multiple
                fullWidth
                value={query.dishTypes}
                getOptionLabel={(option) => option}
                getOptionSelected={(option) => query.dishTypes.includes(option)}
                options={filters.dishTypes}
                ListboxComponent={ListboxComponent}
                ListboxProps={{ className: classes.listbox }}
                ChipProps={{ size: 'small', className: classes.chip }}
                onChange={(e, value) => {
                  handleOnChange(DISH_TYPES, value);
                }}
                renderOption={(option) => (
                  <Typography noWrap>{option}</Typography>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color='secondary'
                    variant='outlined'
                    label='Dish Types'
                    InputProps={{ ...params.InputProps }}
                  />
                )}
              />
            </Grid>
            <Grid item xs>
              <Autocomplete
                multiple
                fullWidth
                value={query.diets}
                getOptionLabel={(option) => option}
                getOptionSelected={(option) => query.diets.includes(option)}
                options={filters.diets}
                ListboxComponent={ListboxComponent}
                ListboxProps={{ className: classes.listbox }}
                ChipProps={{ size: 'small', className: classes.chip }}
                onChange={(e, value) => {
                  handleOnChange(DIETS, value);
                }}
                renderOption={(option) => (
                  <Typography noWrap>{option}</Typography>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color='secondary'
                    variant='outlined'
                    label='Diets'
                    InputProps={{ ...params.InputProps }}
                  />
                )}
              />
            </Grid>
            <Grid item xs>
              <Autocomplete
                multiple
                fullWidth
                value={query.occasions}
                getOptionLabel={(option) => option}
                getOptionSelected={(option) => query.occasions.includes(option)}
                options={filters.occasions}
                ListboxComponent={ListboxComponent}
                ListboxProps={{ className: classes.listbox }}
                ChipProps={{ size: 'small', className: classes.chip }}
                onChange={(e, value) => {
                  handleOnChange(OCCASIONS, value);
                }}
                renderOption={(option) => (
                  <Typography noWrap>{option}</Typography>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color='secondary'
                    variant='outlined'
                    label='Occasions'
                    InputProps={{ ...params.InputProps }}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container item direction='row' justify='space-between'>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                onClick={onSubmit}
                disabled={_.isEqual(query, initialState)}
                style={{ marginRight: 10 }}
              >
                GO!
              </Button>

              <Button
                variant='contained'
                color='secondary'
                onClick={handleReset}
                disabled={_.isEqual(query, initialState)}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

Filterbar.propTypes = {
  query: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  setQuery: PropTypes.func.isRequired,
  getFiltersFromResults: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  query: state.query,
  filters: state.filters,
});

export default connect(mapStateToProps, {
  setQuery,
  getFiltersFromResults,
})(Filterbar);
