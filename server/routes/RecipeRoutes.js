const express = require('express');
const router = express.Router();

const RecipeController = require('../controllers/RecipeController');

// @route  api/recipe/search
router.route('/search').get(RecipeController.getRecipesFromQuery);

// @route  api/recipe/search/:id
router.route('/search/id').get(RecipeController.getRecipeById);

// @route  api/recipe/filters
router.route('/filters').get(RecipeController.getFiltersByQuery);

// router.route('/filters/ingredients').get(RecipeController.getIngredients);

module.exports = router;
