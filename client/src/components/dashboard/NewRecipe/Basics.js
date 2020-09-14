import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import { Grid, Typography, TextField, Button, ButtonGroup,
         Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { setRecipe } from '../../../actions/recipes';
import {
    TITLE,
    SERVINGS,
    READY_IN_MINUTES,
    VERY_HEALTHY,
    IMAGE,
    IMAGE_URL
} from '../../../actions/types';


const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    image: {
        width: 240,
        height: 210,
        minWidth: 180,
        minHeight: 150,
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        objectFit: 'cover',
        overflow: 'hidden',
        '&:hover': {
        background: 'rgb(0, 0, 0)',
        transition: '.4s ease',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 0
        }
    },
    changeImage: {
        position: 'absolute',
        color: 'white',
        overflow: 'hidden',
        width: 'min-content',
        '&:hover': {
        transition: '.4s ease'
        }
    },
    imageDiv: {
        height: "100%",
        width: "100%",
        zIndex: 1,
        '&:hover': {
            transition: '.4s ease',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 2,
            opacity: 0.2
        }
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 100,
    },
    basics_text_align: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'flex-start',
          },
        [theme.breakpoints.up('md')]: {
          justifyContent: 'flex-end',
        },
    }
}))

const Basics = (props) => {
    const classes = useStyles();

    const {
        recipe,
        setRecipe,
        recipe_image_url
     } = props;

    const handleOnChange = (type, value) => {
        setRecipe(type, value);
      };

    // image
    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);


    const handleImageUpload = e => {
        e.preventDefault();
        const [file] = e.target.files;
        if (file) {
        handleOnChange(IMAGE, URL.createObjectURL(file))
        }
        // const reader = new FileReader();
        // const { current } = uploadedImage;
        // current.file = file;
        // reader.onload = e => {
        //     current.src = e.target.result;
        // };
        // reader.readAsDataURL(file);
        // handleOnChange(IMAGE, file);
        // }
    };

    return (
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={2} lg={2} xl={2} className={classes.basics_text_align}>
                    <Typography>Title</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                    <TextField
                        id="recipe_name"
                        name="title"
                        size="small"
                        label="Recipe name"
                        value={recipe.title}
                        required
                        onChange={(e) => handleOnChange(TITLE, e.target.value)}
                        multiline
                        placeholder="e.g. Pasta with chicken and mushrooms"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
               
                <Grid item xs={12} sm={12} md={2} xl={2} className={classes.basics_text_align}>
                    <Typography>Prep time</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} xl={9}>
                    <TextField 
                        id="minutes"
                        name="readyInMinutes"
                        label="Minutes"
                        required
                        value={recipe.readyInMinutes}
                        placeholder="e.g. 45"
                        onChange={(e) => handleOnChange(READY_IN_MINUTES, e.target.value)}
                        size="small"
                        variant="outlined"
                        type="number"
                        InputProps={{ min: 0, pattern: "[1-9][0-9]*" }} // pattern not working
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={2} xl={2} className={classes.basics_text_align}>
                    <Typography>Servings</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} xl={9}>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                        <Button id="subOne"
                                color="secondary"
                                disabled={recipe.servings === 1 ? true : false}
                                onClick={() => handleOnChange(SERVINGS, -1)}>-</Button>
                        <Button color="secondary">{recipe.servings}</Button>
                        <Button id="addOne"
                                color="secondary"
                                onClick={() => handleOnChange(SERVINGS, 1)}>+</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12} sm={12} md={2} xl={2} className={classes.basics_text_align}>
                    <Typography>Healthy</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9} xl={9}>
                    <RadioGroup row value={recipe.veryHealthy} onChange={(e) => handleOnChange(VERY_HEALTHY, e.target.value)}>
                        <FormControlLabel name="veryHealthy" value="true" control={<Radio size="small"/>} label="True" />
                        <FormControlLabel name="veryHealthy" value="false" control={<Radio size="small"  />} label="False" />
                    </RadioGroup>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className={classes.image}>
                <Typography variant="h5" className={classes.changeImage}>Click to change image</Typography>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                    ref={imageUploader}
                    style={{
                    display: "none",
                    }}
                />
                <div className={classes.imageDiv}
                    onClick={() => imageUploader.current.click()}>
                    <img
                        src={recipe_image_url}
                        alt="recipe_logo"
                        ref={uploadedImage}
                        style={{width: "100%", height: "100%"}}
                        />
                </div>
            </div>
            
        </Grid>
    </Grid>
    )
}

const mapStateToProps = (state) => ({
    recipe: state.recipes.recipe,
    recipe_image_url: state.recipes.recipeImageURL
  });

export default connect(mapStateToProps, { setRecipe })(Basics);
