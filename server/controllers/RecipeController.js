const RecipeService = require('../services/RecipeService');
const RedisService = require('../services/RedisService');

class RecipeController {
  static async getRecipesFromQuery(req, res) {
    const { query } = req;

    try {
      const [results] = await RecipeService.getRecipesFromSearchQuery(query);

      if (!results) {
        return res.status(204).json({ msg: 'No results' });
      }

      const { recipes, totalItems, pages } = results;

      return res.status(200).json({
        recipes: recipes,
        pager: {
          totalItems: totalItems,
          pages: pages,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  static async getRecipeFromDb(req, res, next) {
    const token = req.header('x-auth-token');
    const { id } = req.params;

    try {
      const result = await RecipeService.getRecipeById(id);

      if (!result) {
        return res.status(404).json({ msg: 'No results' });
      }

      const recipe = await RedisService.setRecipeToCache(
        id,
        JSON.stringify(result)
      );

      console.log('recipe', recipe);

      if (token) {
        const history = await RedisService.setRecipeToHistory(
          token,
          JSON.stringify(result)
        );

        console.log('historysaddAsync', history);
      }

      return res.status(200).json(result);
      // return next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  static async getFiltersByQuery(req, res) {
    const { query } = req;

    try {
      const [results] = await RecipeService.getFiltersFromSearchQuery(query);

      if (!results) {
        return res.status(404).json({ msg: 'No results' });
      }

      return res.status(200).json(results);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}

module.exports = RecipeController;
