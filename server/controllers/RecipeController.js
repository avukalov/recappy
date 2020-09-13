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
<<<<<<< HEAD

    let recipe_values = req.body;

    try {
        const recipe = await RecipeService.saveRecipe(recipe_values);
        return res.status(200).json(recipe);
    } catch(error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
  }

  static async saveImage(req, res) {

    let file = req.files.file;
    let contentType = file.mimetype;
    let filename = file.name;
    let data = file.data;
    let metadata = "recipe image";

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
            res.status(201).json(fileInfo);
        } catch(err) {
            res.status(500).json(err);
        }
    });
  }
=======
<<<<<<< HEAD
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
=======

    let recipe_values = req.body;

    try {
        const recipe = await RecipeService.saveRecipe(recipe_values);
        return res.status(200).json(recipe);
    } catch(error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
  }

  static async saveImage(req, res) {

    let file = req.files.file;
    let contentType = file.mimetype;
    let filename = file.name;
    let data = file.data;
    let metadata = "recipe image";

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
            res.status(201).json(fileInfo);
        } catch(err) {
            res.status(500).json(err);
        }
    });
  }
>>>>>>> 88e673ef39fc7717a6eb35976bc293a8049577f9

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

  // user recipes

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
      res.status(201).json(recipes);
    }
  }

<<<<<<< HEAD
=======
>>>>>>> df8e4a6f4c9ba7afea5bc011b2f31b54a8c8283c
>>>>>>> 88e673ef39fc7717a6eb35976bc293a8049577f9
}

module.exports = RecipeController;
