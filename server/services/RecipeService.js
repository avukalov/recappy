const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');
const File = mongoose.model('File');

const objectId = mongoose.Types.ObjectId;

const AggregationService = require('./helpers/AggregationService');
// const { hlen } = require('../config/redis');

class RecipeService {
  // Get recipes from database by search query
  static async getRecipesFromSearchQuery(query) {
    const { text, skipItems, itemsPerPage } = query;

    const match = AggregationService.createAggregateMatch(query);
    const sortBy = AggregationService.createAggregateSort(query);

    return await Recipe.aggregate([
      text !== ''
        ? {
            $match: {
              $and: [{ $text: { $search: query.text } }, match],
            },
          }
        : { $match: match },
      // text !== '' && query.sortBy === 'relevance'
      //   ? { $sort: { score: { $meta: 'textScore' } } }
      //   : { $sort: sortBy },
      {
        $group: {
          _id: null,
          recipes: {
            $push: {
              _id: '$_id',
              title: '$title',
              image: '$image',
              readyInMinutes: '$readyInMinutes',
              pricePerServing: '$pricePerServing',
              servings: '$servings',
              veryHealthy: '$veryHealthy',
            },
          },
          totalItems: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          recipes: {
            $slice: ['$recipes', parseInt(skipItems), parseInt(itemsPerPage)],
          },
          totalItems: 1,
          pages: {
            $ceil: { $divide: ['$totalItems', parseInt(itemsPerPage)] },
          },
        },
      },
    ]);
  }

  static async getRecipesFromCarouselQuery(query) {
    const { skipItems, itemsPerPage } = query;

    console.log('service', query);
    const match = AggregationService.createAggregateMatch(query);

    console.log(match);
    return await Recipe.aggregate([
      { $match: match },
      { $sort: { spoonacularScore: -1 } },
      {
        $group: {
          _id: null,
          recipes: {
            $push: {
              _id: '$_id',
              title: '$title',
              image: '$image',
              readyInMinutes: '$readyInMinutes',
              pricePerServing: '$pricePerServing',
              servings: '$servings',
              veryHealthy: '$veryHealthy',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          recipes: {
            $slice: ['$recipes', parseInt(skipItems), parseInt(itemsPerPage)],
          },
        },
      },
    ]);
  }

  // Get single recipe by id
  static async getRecipeById(id) {
    return await Recipe.findById(id).select('-nutrition').exec();
  }

  // Get filter options depending by query results
  static async getFiltersFromSearchQuery(query) {
    const matchQuery = AggregationService.createAggregateMatch(query);

    return await Recipe.aggregate([
      query.text !== ''
        ? {
            $match: {
              $and: [{ $text: { $search: query.text } }, matchQuery],
            },
          }
        : { $match: matchQuery },
      {
        $group: {
          _id: null,
          ingredients: { $addToSet: '$extendedIngredients.name' },
          dishTypes: { $addToSet: '$dishTypes' },
          diets: { $addToSet: '$diets' },
          occasions: { $addToSet: '$occasions' },
          cuisines: { $addToSet: '$cuisines' },
        },
      },
      {
        $project: {
          _id: 0,
          filters: {
            ingredients: {
              $reduce: {
                input: '$ingredients',
                initialValue: [],
                in: { $setUnion: ['$$value', '$$this'] },
              },
            },
            dishTypes: {
              $reduce: {
                input: '$dishTypes',
                initialValue: [],
                in: { $setUnion: ['$$value', '$$this'] },
              },
            },
            diets: {
              $reduce: {
                input: '$diets',
                initialValue: [],
                in: { $setUnion: ['$$value', '$$this'] },
              },
            },
            occasions: {
              $reduce: {
                input: '$occasions',
                initialValue: [],
                in: { $setUnion: ['$$value', '$$this'] },
              },
            },
            cuisines: {
              $reduce: {
                input: '$cuisines',
                initialValue: [],
                in: { $setUnion: ['$$value', '$$this'] },
              },
            },
          },
        },
      },
    ]);
  }

  // TODO: getReadyInMinutes

  // TODO: getPricePerServing

  // Helper method for generating match stage from search query

  static async getRecipesFromSearchQuery_Backup(query) {
    const matchQuery = RecipeService.createAggregateMatchString(query);
    const keywords = query.textSearch;

    return await Recipe.aggregate([
      query.textSearch !== ''
        ? {
            $match: {
              $and: [{ $text: { $search: keywords } }, matchQuery],
            },
          }
        : { $match: matchQuery },
      query.textSearch !== ''
        ? { $sort: { score: { $meta: 'textScore' } } }
        : { $sort: { spoonacularScore: -1 } },
      {
        $group: {
          _id: null,
          recipes: {
            $push: {
              _id: '$_id',
              title: '$title',
              image: '$image',
              readyInMinutes: '$readyInMinutes',
              servings: '$servings',
              pricePerServing: '$pricePerServing',
            },
          },
          ingredients: { $addToSet: '$extendedIngredients.name' },
          dishTypes: { $addToSet: '$dishTypes' },
          diets: { $addToSet: '$diets' },
          occasions: { $addToSet: '$occasions' },
          cuisines: { $addToSet: '$cuisines' },
        },
      },
      {
        $project: {
          _id: 1,
          recipes: {
            $slice: ['$recipes', parseInt(query.skip), parseInt(query.limit)],
          },
          filters: {
            ingredients: {
              $reduce: {
                input: '$ingredients',
                initialValue: [],
                in: { $setUnion: ['$$value', '$$this'] },
              },
            },
            dishTypes: {
              $reduce: {
                input: '$dishTypes',
                initialValue: [],
                in: { $setUnion: ['$$value', '$$this'] },
              },
            },
            diets: {
              $reduce: {
                input: '$diets',
                initialValue: [],
                in: { $setUnion: ['$$value', '$$this'] },
              },
            },
            occasions: {
              $reduce: {
                input: '$occasions',
                initialValue: [],
                in: { $setUnion: ['$$value', '$$this'] },
              },
            },
            cuisines: {
              $reduce: {
                input: '$cuisines',
                initialValue: [],
                in: { $setUnion: ['$$value', '$$this'] },
              },
            },
          },
        },
      },
    ]);
  }

  // Save recipe in database

  static async saveRecipe(recipe_values) {
    let recipe = new Recipe(recipe_values);
    await recipe.save();

    return recipe;
  }

  static async findFileById(id) {
    let _id = objectId(id);
    return await File.findOne({ _id }).exec();
  }

  // static async findFilesByOwnerId(id) {
  //   return await File.find({ "metadata.owner": id}).exec();
  // }

  static async removeRecipeFiles(id) {
    return await File.deleteMany({ 'metadata.owner': objectId(id) }).exec();
  }

  static async updateImage(fileID, recipeID) {
    return await File.update(
      { _id: objectId(fileID) },
      {
        $set: {
          'metadata.owner': objectId(recipeID),
        },
      }
    ).exec();
  }

  static async getUserRecipes(id) {
    return await Recipe.find({ 'user._id': id }).exec();
  }

  static async updateRecipe(recipe) {
    return await Recipe.findOneAndUpdate(
      { _id: objectId(recipe._id) },
      recipe,
      { new: true }
    ).exec();
  }

  static async deleteRecipe(recipeID) {
    return await Recipe.deleteOne({ _id: recipeID }).exec();
  }
}

module.exports = RecipeService;
