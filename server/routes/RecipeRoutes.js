const express = require('express');
const router = express.Router();

const CacheMiddleware = require('../middleware/CacheMiddleware');
const RecipeController = require('../controllers/RecipeController');

// @route  api/recipe/carousel
router.route('/carousel').get(RecipeController.carousel);

// @route  api/recipe/search
router.route('/search').get(RecipeController.getRecipesFromQuery);

// @route  api/recipe/search/:id
router
  .route('/search/:id')
  .get(CacheMiddleware.getRecipeFromCache, RecipeController.getRecipeFromDb);

// @route  api/recipe/filters
router.route('/filters').get(RecipeController.getFiltersByQuery);

// router.route('/filters/ingredients').get(RecipeController.getIngredients);

// @route  api/recipe/create
router.route('/create').post(RecipeController.createRecipe);

// @route  api/recipe/image/:id
router.route('/image/:id').get(RecipeController.getFile);

// @route  api/recipe/userRecipes
router.route('/userRecipes/:id').get(RecipeController.userRecipes);

// @route  api/recipe/update
router.route('/update').put(RecipeController.updateRecipe);

// @route  api/recipe/delete
router.route('/delete').delete(RecipeController.removeFiles);

module.exports = router;
