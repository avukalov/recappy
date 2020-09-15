const RecipeService = require('../services/RecipeService');
const RedisService = require('../services/RedisService');

const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const Readable = require("stream").Readable;

let bucket;
mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
});



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
    var recipe_values = JSON.parse(req.body.recipe_values);
    let file = req.files.file;
  
    var image_url;

    if (file) {
      let contentType = file.mimetype;
      let filename = file.name;
      let data = file.data;
      let metadata = { owner: recipe_values._id };

      const readableStream = new Readable();
      readableStream.push(data);
      readableStream.push(null);

      let uploadStream = bucket.openUploadStream(filename, { contentType, metadata });
      readableStream.pipe(uploadStream);

      let message;
      uploadStream.on("error", () => {
          message = "Error when uploading";
          res.status(500).json({ message });
      });

      uploadStream.on("finish", async () => {
        try {
            let fileInfo = await RecipeService.findFileById(uploadStream.id);
            image_url = `http://localhost:3001/api/recipe/image/${fileInfo._id}`;
            recipe_values.image = image_url;
            const recipe = await RecipeService.saveRecipe(recipe_values);
            const changed = await RecipeService.updateImage(fileInfo._id, recipe._id);
            console.log(changed)
            res.status(200).send(recipe);
        } catch(err) {
            console.log(err);
            res.status(500).send('Server error');
        }
    })
    } else {
      try {
        const recipe = await RecipeService.saveRecipe(recipe_values);
        res.status(200).send(recipe);
    } catch(err) {
        console.log(err);
        res.status(500).send('Server error');
    }
    }
  }

//   static async getAllFiles(req, res) {
//     try {
//         files = await RecipeService.findFilesByOwnerId(req.body.id);
//     } catch (err) {
//         return res.status(500).json(err);
//     }
//     let message = "Sending files";
//     return res.status(200).send({ files, message });        
//   }

  static async getFile(req, res) {
    let id = req.params.id;
    let file, message

    try {
        file = await RecipeService.findFileById(id);
    } catch(err) {
        return res.status(500).json(err);
    }

    if(!file) {
        message = "Not found";
       return res.status(404).json({ message });
    }
  
    let downloadStream = bucket.openDownloadStream(objectId(id), {encoding: 'utf8'});
    res.writeHead(200, { "Content-Type": file.contentType });
    downloadStream.pipe(res);
  }

  static async userRecipes(req, res) {
    let id = req.params.id;
    let recipes
    
    try {
      recipes = await RecipeService.getUserRecipes(id);
    } catch(error) {
      return res.status(500).json(error);
    }

    if(!recipes) {
      let message = "No recipes";
      return res.status(404).json({ message });
    } else {
      return res.status(201).json(recipes);
    }
  }

  static async updateRecipe(req, res) {
    var recipe_values = JSON.parse(req.body.recipe_values);
    let file = req.files.file;

    var image_url;

    if (file) {
      let contentType = file.mimetype;
      let filename = file.name;
      let data = file.data;
      let metadata = { active : true, owner: recipe_values._id};
  
      const readableStream = new Readable();
      readableStream.push(data);
      readableStream.push(null);

      let uploadStream = bucket.openUploadStream(filename, { contentType, metadata });
      readableStream.pipe(uploadStream);

      let message;
      uploadStream.on("error", () => {
          message = "Error when uploading";
          res.status(500).json({ message });
      });

      uploadStream.on("finish", async () => {
        try {
            let fileInfo = await RecipeService.findFileById(uploadStream.id);
            image_url = `http://localhost:3001/api/recipe/image/${fileInfo._id}`;
            recipe_values.image = image_url;
            const recipe = await RecipeService.updateRecipe(recipe_values);
            const changed = await RecipeService.updateImage(fileInfo._id, recipe._id);
            res.status(200).send(recipe);
        } catch(err) {
            console.log(err);
            res.status(500).send('Server error');
        }
    })
    } else {
      try {
        const recipe = await RecipeService.updateRecipe(recipe_values);
        res.status(200).send(recipe);
    } catch(err) {
        console.log(err);
        res.status(500).send('Server error');
    }}
  }

  static async removeFiles(req, res) {
    let recipe_id = req.body.recipeID;
    let user_id = req.body.userID;

    try {
      await RecipeService.removeRecipeFiles(recipe_id);
    } catch(err) {
      console.log(err);
    }

    try {
      await RecipeService.deleteRecipe(recipe_id);
      const newUserRecipes = await RecipeService.getUserRecipes(user_id);
      return res.json(newUserRecipes).status(200);
    } catch(err) {
        return res.status(500).json('Server error');
    }
  }
}

module.exports = RecipeController;
