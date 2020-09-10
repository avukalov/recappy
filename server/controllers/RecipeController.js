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

  static async getRecipeFromDb(req, res) {
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

      console.log('set: recipe', recipe);

      if (token) {
        const history = await RedisService.setRecipeToHistory(
          token,
          JSON.stringify(result)
        );

        console.log('sadd: history', history);
      }

      return res.status(200).json(result);
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

  static async carousel(req, res) {
    const { query } = req;

    console.log('controller', query);

    try {
      const [results] = await RecipeService.getRecipesFromCarouselQuery(query);

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

  static async createRecipe(req, res) {
    //let file = req.body.image;
    //const recipe_values = req.body;
    console.log(req.files.file);
    console.log(req.body);
    // let contentType = file.type;
    // let filename = file.name;

    // promijeniti req.payload._id u id recepta
    // let owner = objectId(req.payload._id);
    // let metadata = { owner };

    // try {
    //   const recipe = await RecipeService.saveRecipe(recipe_values);
    //   return res.status(200).json(recipe);
    // } catch(error) {
    //   console.log(error);
    //   return res.status(500).send('Server error');
    // }
  }
  // https://stackoverflow.com/questions/22219400/display-image-in-gridfs
}

module.exports = RecipeController;
