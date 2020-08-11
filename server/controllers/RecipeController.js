const RecipeService = require('../services/RecipeService');

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

  static async getRecipeById(req, res) {
    const { id } = req.query;

    try {
      const results = await RecipeService.getRecipeById(id);
      return res.status(200).json(results);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
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
