import React from 'react';
import { connect } from 'react-redux';

import { Grid, Typography, TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { setRecipe } from '../../../actions/recipes';
import {
    OCCASIONS,
    CUISINES,
    DISH_TYPES,
    DIETS
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
                <Typography>Note: Press enter after entering each value.</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Autocomplete
                    multiple
                    freeSolo
                    value={recipe.cuisines}
                    size="small"
                    options={[]}
                    onChange={(e, value) => handleOnChange(CUISINES, value)}
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
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Autocomplete
                    multiple
                    freeSolo
                    value={recipe.dishTypes}
                    size="small"
                    options={[]}
                    onChange={(e, value) => handleOnChange(DISH_TYPES, value)}
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
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Autocomplete
                    multiple
                    freeSolo
                    value={recipe.diets}
                    size="small"
                    options={[]}
                    onChange={(e, value) => handleOnChange(DIETS, value)}
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
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Autocomplete
                    multiple
                    freeSolo
                    value={recipe.occasions}
                    size="small"
                    onChange={(e, value) => handleOnChange(OCCASIONS, value)}
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
