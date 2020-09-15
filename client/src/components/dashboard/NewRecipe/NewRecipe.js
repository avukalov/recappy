import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Container, Grid, Typography, Button, Stepper, Step, StepLabel, StepContent, Paper, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Basics from './Basics';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import Additional from './Additional';

import {
    RESET_RECIPE,
} from '../../../actions/types';
import { createRecipe, setRecipe, updateRecipe } from '../../../actions/recipes';


const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        float: 'right',
        margin: theme.spacing(3, 0, 2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 100,
    },
    title: {
        marginBottom: theme.spacing(2),
        width: '80%'
    }
}))


function getSteps() {
    return ['Basic info', 'Ingredients', 'Instructions', 'Additional info'];
}
  
function getStepContent(step, list_of_content) {
    return(list_of_content[step]);
}

const NewRecipe = (props) => {
    const classes = useStyles();

    const {
        recipe,
        setRecipe,
        createRecipe,
        updateRecipe,
        user : { _id, firstName, lastName, email },
        recipe_action
    } = props;

    const handleSubmit = async (e) => {
        e.preventDefault();

        recipe.user = { _id, firstName, lastName, email };

        const full_recipe = new FormData() 
        full_recipe.append('file', recipe.image);
        full_recipe.append('recipe_values', JSON.stringify(recipe));

        if (recipe_action === 'Create'){
            await createRecipe(full_recipe);
        } else {
            await updateRecipe(full_recipe);
        }
        
        props.changeComponent('My recipes');
        handleReset();

    }


    // stepper
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

    const handleReset = () => {
        setRecipe(RESET_RECIPE);
        setActiveStep(0);
      };


    // form validation -> in child components

    const validateForm = (i) => {
    //     switch(i) {
    //         case 0:
    //             if (recipe.title === '' ||
    //                 recipe.readyInMinutes <= 0 ||
    //                 recipe.readyInMinutes === '')
    //                     return true;
    //             else return false;
    //         case 1:
    //             if (recipe.extendedIngredients[0].name === '' ||
    //                 recipe.extendedIngredients[0].amount <= 0 ||
    //                 recipe.extendedIngredients[0].amount === '' ||
    //                 recipe.extendedIngredients[0].unit === '')
    //                     return true;
    //             else return false;
    //         case 2:
    //             if (recipe.instructions[0] === '')
    //                     return true;
    //             else return false;
    //         case 3:
    //             if (recipe.dishTypes === [])
    //                     return true;
    //             else return false;
    //         default:
    //             return true;
    //     }
    }

    // stepper content
    const basics = <Basics />
    const ingredients = <Ingredients />
    const instructions = <Instructions />
    const additional = <Additional />
                
    return (
        <Zoom in={true}>
        <Container className={classes.root}>
            {/* <Typography className={classes.title} variant="h4">New recipe</Typography> */}
            <Typography className={classes.title} variant="body2">
                Here you can create or update recipe by filling out the given form.
                If some of the required fields remain empty, you will not be able to do so.
                Required fields are marked with *.
            </Typography>
            <hr style={{width: '80%'}} />
            <Grid container direction="column" spacing={3}>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography component='span'>{getStepContent(index, [basics, ingredients, instructions, additional] )}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                    disabled={validateForm(index)}
                                    >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                        </Step>
                    ))}
                    </Stepper>
                    {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <div>
                            <Typography>All steps are completed. Now you can create your recipe.</Typography>
                            <Button color="secondary" variant="contained" disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                            </Button>
                            <Button className={classes.button} variant="contained" color="primary" type="submit">{recipe_action}</Button>
                            <Button className={classes.button} variant="contained" color="secondary" onClick={handleReset}>Cancel</Button>
                        </div>
                    </Paper>
                    )}
                </form>
            </Grid>

        </Container>
        </Zoom>

    );
}

const mapStateToProps = (state) => ({
  recipe: state.recipes.recipe,
  user: state.auth.user,
  recipe_action: state.recipes.action
});

export default connect(mapStateToProps, { createRecipe, setRecipe, updateRecipe })(NewRecipe);
