import React from 'react';
import { connect } from 'react-redux';

import { Grid, Typography, TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { setRecipe } from '../../../actions/recipes';
import {
    RECIPE_OCCASIONS,
    RECIPE_CUISINES,
    RECIPE_DISH_TYPES,
    RECIPE_DIETS
} from '../../../actions/types';

const Additional = (props) => {

    const {
        recipe,
        setRecipe
    } = props;

    const handleOnChange = (type, value) => {
        setRecipe(type, value);
      };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body2">Note: Press enter after entering each value.</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                <Autocomplete
                    multiple
                    freeSolo
                    value={recipe.cuisines}
                    size="small"
                    options={[]}
                    onChange={(e, value) => handleOnChange(RECIPE_CUISINES, value)}
                    ChipProps={{color: 'secondary', variant: 'outlined'}}
                    renderInput={params => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Cuisines"
                            placeholder="e.g. Italian"
                            // helperText="press enter after entering value"
                            fullWidth={true}
                        //     InputLabelProps={{
                        //         shrink: true,
                        // }}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                <Autocomplete
                    multiple
                    freeSolo
                    value={recipe.dishTypes}
                    size="small"
                    options={[]}
                    onChange={(e, value) => handleOnChange(RECIPE_DISH_TYPES, value)}
                    ChipProps={{color: 'secondary', variant: 'outlined'}}
                    renderInput={params => (
                        <TextField
                            {...params}
                            placeholder="e.g. Lunch"
                            variant="outlined"
                            label="Dish Types"
                            // helperText="press enter after entering value"
                            fullWidth={true}
                        //     InputLabelProps={{
                        //         shrink: true,
                        // }}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                <Autocomplete
                    multiple
                    freeSolo
                    value={recipe.diets}
                    size="small"
                    options={[]}
                    onChange={(e, value) => handleOnChange(RECIPE_DIETS, value)}
                    ChipProps={{color: 'secondary', variant: 'outlined'}}
                    renderInput={params => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="e.g. Gluten free"
                            label="Diets"
                            // helperText="press enter after entering value"
                            fullWidth={true}
                        //     InputLabelProps={{
                        //         shrink: true,
                        // }}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                <Autocomplete
                    multiple
                    freeSolo
                    value={recipe.occasions}
                    size="small"
                    onChange={(e, value) => handleOnChange(RECIPE_OCCASIONS, value)}
                    options={[]}
                    placeholder="e.g. Summer"
                    ChipProps={{color: 'secondary', variant: 'outlined'}}
                    renderInput={params => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Occasions"
                            // helperText="press enter after entering value"
                            placeholder="e.g. Summer"
                            fullWidth={true}
                        //     InputLabelProps={{
                        //         shrink: true,
                        // }}
                        />
                    )}
                />
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    recipe: state.recipes.recipe,
    user: state.user,
  });

export default connect(mapStateToProps, { setRecipe })(Additional);
