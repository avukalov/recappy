import React from 'react';
import { connect } from 'react-redux';

import { Grid, Typography, TextField, MenuItem, IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { setRecipe } from '../../../actions/recipes';
import {
    INGREDIENT_AMOUNT,
    INGREDIENT_UNIT,
    INGREDIENT_NAME,
    EXTENDED_INGREDIENTS,
    INGREDIENTS
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
  ];

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 100,
    },
    addIngredient: {
        display: 'flex',
        alignItems: 'center',
    }
}))

const Ingredients = (props) => {
    const classes = useStyles();

    const {
        recipe,
        setRecipe
    } = props;

    const handleOnChange = (type, value) => {
        setRecipe(type, value);
      };

    const AddInputField = type => {
        let recipe_values = recipe.extendedIngredients;
        recipe_values.push({ name: '', amount: '', unit: '' });
        handleOnChange(type, recipe_values);
    }
    
    const RemoveInputField = (i, type) => {
        let recipe_values = recipe.extendedIngredients;
        recipe_values.splice(i, 1);
        handleOnChange(type, recipe_values)
    }

    return (
        <Grid container spacing={3} className={classes.details}>
            <Grid item>
                <Typography variant="body2">Note: There must be at least one ingredient.</Typography>
            </Grid>
            <Grid item xs={10}>
                {recipe.extendedIngredients.map((field, id) => {
                    return (
                        <Grid container key={`${field}-${id}`} spacing={1}>
                        <Grid item xs={11} sm={11} md={2} lg={2} xl={2}>
                            <TextField
                                id={id.toString()}
                                name="amount"
                                label="Amount"
                                placeholder="e.g. 100"
                                required
                                value={recipe.extendedIngredients[id].amount}
                                variant="outlined"
                                size="small"
                                type="number"
                                fullWidth={true}
                                InputProps={{ inputProps: { min: 0} }}
                                onChange={(e) => handleOnChange(INGREDIENT_AMOUNT, {id, value: isNaN(e.target.value) ? 0 : parseInt(e.target.value)})}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={11} sm={11} md={2} lg={2} xl={2}>
                            <TextField
                                id={id.toString()}
                                select
                                name="unit"
                                label="Measure"
                                defaultValue=''
                                required
                                value={recipe.extendedIngredients[id].unit}
                                onChange={(e) => {handleOnChange(INGREDIENT_UNIT, {id, value: e.target.value})}}
                                size="small"
                                fullWidth={true}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                >
                                {measures.map((option) => (
                                    <MenuItem id={id} key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={11} sm={11} md={5} lg={5} xl={5}>
                        <TextField
                            id={id.toString()}
                            size="small"
                            name="name"
                            label="Ingredient name"
                            value={recipe.extendedIngredients[id].name}
                            placeholder="e.g. pasta"
                            required
                            fullWidth={true}
                            onChange={(e) => {handleOnChange(INGREDIENT_NAME, {id, value: e.target.value});
                                              handleOnChange(INGREDIENTS, {id, value: e.target.value })}}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            >
                        </TextField>
                        </Grid>
                        <Grid item xs={11} sm={11} md={1} lg={1} xl={1}>
                            <IconButton onClick={() => RemoveInputField(id, EXTENDED_INGREDIENTS)}>
                                <HighlightOffIcon />
                            </IconButton>
                        </Grid>
                </Grid>
                )})}
                <Grid item xs={12} className={classes.addIngredient}>
                    <IconButton onClick={() => AddInputField(EXTENDED_INGREDIENTS)}>
                        <AddCircleIcon />
                    </IconButton>
                    <Typography>Add ingredient</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    recipe: state.recipes.recipe,
  });

export default connect(mapStateToProps, { setRecipe })(Ingredients);
