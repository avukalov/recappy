import React from 'react';
import { connect } from 'react-redux';

import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { setRecipe } from '../../../actions/recipes';
import {
  INGREDIENT_AMOUNT,
  INGREDIENT_UNIT,
  INGREDIENT_NAME,
  EXTENDED_INGREDIENTS,
  INGREDIENTS,
} from '../../../actions/types';

const measures = [
  {
    value: 'lb',
    label: 'lb',
  },
  {
    value: 'g',
    label: 'g',
  },
  {
    value: 'kg',
    label: 'kg',
  },
  {
    value: 'ml',
    label: 'ml',
  },
  {
    value: 'L',
    label: 'L',
  },
  {
    value: 'tbs',
    label: 'tbs',
  },
  {
    value: 'tsp',
    label: 'tsp',
  },
  {
    value: 'cup',
    label: 'cup',
  },
  {
    value: 'whole',
    label: 'whole',
  },
];

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
  },
  addIngredient: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Ingredients = (props) => {
  const classes = useStyles();

  const { recipe, setRecipe } = props;

  const handleOnChange = (type, value) => {
    setRecipe(type, value);
  };

  const AddInputField = (type) => {
    let recipe_values = recipe.extendedIngredients;
    recipe_values.push({ name: '', amount: '', unit: '' });
    handleOnChange(type, recipe_values);
  };

  const RemoveInputField = (i, type) => {
    if (i > 0) {
      let recipe_values = recipe.extendedIngredients;
      recipe_values.splice(i, 1);
      handleOnChange(type, recipe_values);
    }
  };

  return (
    <Grid container spacing={3} className={classes.details}>
      <Grid item>
        <Typography variant='body2'>
          Note: There must be at least one ingredient.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        {recipe.extendedIngredients.map((field, index) => {
          return (
            <Grid container key={`${field}-${index}`} spacing={1}>
              <Grid item xs={11} sm={11} md={2} lg={2} xl={2}>
                <TextField
                  id={index.toString()}
                  name='amount'
                  label='Amount'
                  placeholder='e.g. 100'
                  required
                  value={recipe.extendedIngredients[index].amount}
                  variant='outlined'
                  size='small'
                  type='number'
                  fullWidth={true}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) =>
                    handleOnChange(INGREDIENT_AMOUNT, {
                      index,
                      value: isNaN(e.target.value)
                        ? 0
                        : parseInt(e.target.value),
                    })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={11} sm={11} md={2} lg={2} xl={2}>
                <TextField
                  id={index.toString()}
                  select
                  name='unit'
                  label='Unit'
                  defaultValue=''
                  required
                  value={recipe.extendedIngredients[index].unit}
                  onChange={(e) => {
                    handleOnChange(INGREDIENT_UNIT, {
                      index,
                      value: e.target.value,
                    });
                  }}
                  size='small'
                  fullWidth={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='outlined'
                >
                  {measures.map((option) => (
                    <MenuItem
                      id={index}
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={11} sm={11} md={5} lg={5} xl={5}>
                <TextField
                  id={index.toString()}
                  size='small'
                  name='name'
                  label='Ingredient name'
                  value={recipe.extendedIngredients[index].name}
                  placeholder='e.g. pasta'
                  required
                  fullWidth={true}
                  onChange={(e) => {
                    handleOnChange(INGREDIENT_NAME, {
                      index,
                      value: e.target.value,
                    });
                    handleOnChange(INGREDIENTS, {
                      index,
                      value: e.target.value,
                    });
                  }}
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={11} sm={11} md={1} lg={1} xl={1}>
                <IconButton
                  onClick={() => RemoveInputField(index, EXTENDED_INGREDIENTS)}
                >
                  <HighlightOffIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
        <Grid item xs={12} className={classes.addIngredient}>
          <Button
            variant='text'
            //color="secondary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => AddInputField(EXTENDED_INGREDIENTS)}
          >
            Add ingredient
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  recipe: state.recipes.recipe,
});

export default connect(mapStateToProps, { setRecipe })(Ingredients);
