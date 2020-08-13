const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');

const AggregationService = require('./helpers/AggregationService');

class RecipeService {
  // Get recipes from database by search query
  static async getRecipesFromSearchQuery(query) {
    const matchQuery = AggregationService.createAggregateMatchString(query);

    return await Recipe.aggregate([
      query.text !== ''
        ? {
            $match: {
              $and: [{ $text: { $search: query.text } }, matchQuery],
            },
          }
        : { $match: matchQuery },
      query.text !== ''
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
              pricePerServing: '$pricePerServing',
              servings: '$servings',
              cheap: '$cheap',
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
            $slice: [
              '$recipes',
              parseInt(query.skipItems),
              parseInt(query.itemsPerPage),
            ],
          },
          totalItems: 1,
          pages: {
            $ceil: { $divide: ['$totalItems', parseInt(query.itemsPerPage)] },
          },
        },
      },
    ]);
  }

  // Get single recipe by id
  static async getRecipeById(id) {
    return await Recipe.findOne({ _id: id }).exec();
  }

  // Get filter options depending by query results
  static async getFiltersFromSearchQuery(query) {
    const matchQuery = AggregationService.createAggregateMatchString(query);

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
          // ingredients: { $addToSet: '$extendedIngredients.name' },
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
            // ingredients: {
            //   $reduce: {
            //     input: '$ingredients',
            //     initialValue: [],
            //     in: { $setUnion: ['$$value', '$$this'] },
            //   },
            // },
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
}

module.exports = RecipeService;
