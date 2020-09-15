import React, { useRef } from 'react';
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
        width: 270,
        height: 240,
        minWidth: 190,
        minHeight: 170,
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
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
        objectFit: 'cover',
        overflow: 'hidden',
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

    // image
    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);


    const handleImageUpload = e => {
        e.preventDefault();
        const [file] = e.target.files;
        if (file) {
            if (file.size < 2*1024*1024) {
                const reader = new FileReader();
                const { current } = uploadedImage;
                current.file = file;
                reader.onload = e => {
                    current.src = e.target.result;
                };
                reader.readAsDataURL(file);
                setRecipe(IMAGE_URL, URL.createObjectURL(file));
                setRecipe(IMAGE, file);
                
            } else {
                window.alert('Image too big');
            }
    }};

    return (
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} className={classes.basics_text_align}>
                    <Typography>Title</Typography>
                </Grid>
                <Grid item xs={10} sm={10} md={8} lg={8} xl={8}>
                    <TextField
                        id="recipe_name"
                        name="title"
                        size="small"
                        label="Recipe name"
                        value={recipe.title}
                        required
                        fullWidth
                        onChange={(e) => setRecipe(TITLE, e.target.value)}
                        placeholder="e.g. Pasta with chicken and mushrooms"
                        variant="outlined"
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
                    />
                </Grid>
               
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} className={classes.basics_text_align}>
                    <Typography>Prep time</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <TextField 
                        id="minutes"
                        name="readyInMinutes"
                        label="Minutes"
                        required
                        value={recipe.readyInMinutes}
                        placeholder="e.g. 45"
                        onChange={(e) => setRecipe(READY_IN_MINUTES, e.target.value)}
                        size="small"
                        variant="outlined"
                        type="number"
                        inputProps={{ min: 0, pattern: "\d*"}}
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} className={classes.basics_text_align}>
                    <Typography>Servings</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                        <Button id="subOne"
                                color="secondary"
                                disabled={recipe.servings === 1 ? true : false}
                                onClick={() => setRecipe(SERVINGS, -1)}>-</Button>
                        <Button color="secondary">{recipe.servings}</Button>
                        <Button id="addOne"
                                color="secondary"
                                onClick={() => setRecipe(SERVINGS, 1)}>+</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} className={classes.basics_text_align}>
                    <Typography>Healthy</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <RadioGroup row value={recipe.veryHealthy} onChange={(e) => setRecipe(VERY_HEALTHY, e.target.value)}>
                        <FormControlLabel name="veryHealthy" value="true" control={<Radio size="small"/>} label="True" />
                        <FormControlLabel name="veryHealthy" value="false" control={<Radio size="small"  />} label="False" />
                    </RadioGroup>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
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
                        src={recipe_image_url ? recipe_image_url : require('../../../shared/images/recipe-default.png')}
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
