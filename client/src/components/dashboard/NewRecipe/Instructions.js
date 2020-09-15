import React from 'react';
import { connect } from 'react-redux';

import { Grid, Typography, TextField, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { setRecipe } from '../../../actions/recipes';
import {
    INSTRUCTIONS,
    ADD_REMOVE_INSTRUCTIONS,
} from '../../../actions/types';


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


const Instructions = (props) => {
    const classes = useStyles();

    const {
        recipe,
        setRecipe
    } = props;

    const handleOnChange = (type, value) => {
        setRecipe(type, value);
      };

    const AddInputField = type => {
        let recipe_values = recipe.instructions;
        recipe_values.push('');
        handleOnChange(type, recipe_values);
    }
    
    const RemoveInputField = (i, type) => {
        let recipe_values = recipe.instructions;
        recipe_values.splice(i, 1);
        handleOnChange(type, recipe_values)
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="body2">Note: Please write detailed instructions.</Typography>
            </Grid>
            <Grid item xs={12}>
                {recipe.instructions.map((field, index) => {
                    return (
                        <Grid container key={`instruction-${index}`} spacing={3}>
                        <Grid item xs={9} sm={9} md={9} xl={9}>
                            <TextField
                                id={index.toString()}
                                name="instructions"
                                label={"Step " + (index+1).toString()}
                                value={recipe.instructions[index]}
                                required
                                placeholder={index === 0 ? "e.g. Cook pasta in water." : ''}
                                onChange={(e) => handleOnChange(INSTRUCTIONS, {index, value: e.target.value})}
                                variant="outlined"
                                multiline
                                fullWidth={true}
                                    // InputLabelProps={{
                                    //     shrink: true,
                                    // }}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} xl={1}>
                            <IconButton onClick={() => RemoveInputField(index, ADD_REMOVE_INSTRUCTIONS)}>
                                <HighlightOffIcon />
                            </IconButton>
                        </Grid>
                        </Grid>
                )})}
            </Grid>
            <Grid item xs={12} className={classes.addIngredient}>
                <Button
                    variant="text"
                    //color="secondary"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => AddInputField(ADD_REMOVE_INSTRUCTIONS)}
                >
                    Add instruction
                </Button>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    recipe: state.recipes.recipe,
  });

export default connect(mapStateToProps, { setRecipe })(Instructions);
