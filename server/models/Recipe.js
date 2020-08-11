const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema(
  {
    vegetarian: Boolean,
    vegan: Boolean,
    glutenFree: Boolean,
    dairyFree: Boolean,
    veryHealthy: Boolean,
    cheap: Boolean,
    veryPopular: Boolean,
    sustainable: Boolean,
    weightWatcherSmartPoints: Number,
    gaps: String,
    lowFodmap: Boolean,
    preparationMinutes: Number,
    cookingMinutes: Number,
    sourceUrl: String,
    spoonacularSourceUrl: String,
    aggregateLikes: Number,
    spoonacularScore: Number,
    healthScore: Number,
    creditsText: String,
    sourceName: String,
    pricePerServing: Number,
    extendedIngredients: [
      {
        id: Number,
        aisle: String,
        image: String,
        consitency: String,
        name: String,
        original: String,
        originalString: String,
        originalName: String,
        amount: Number,
        unit: String,
        meta: [],
        metaInformation: [],
        measures: {
          us: {
            amount: Number,
            unitShort: String,
            unitLong: String,
          },
          metric: {
            amount: Number,
            unitShort: String,
            unitLong: String,
          },
        },
      },
    ],
    id: { type: Number, unique: true },
    title: String,
    readyInMinutes: Number,
    servings: Number,
    image: String,
    imageType: String,
    cuisines: [],
    dishTypes: [],
    diets: [],
    occasions: [],
    winePairing: {
      pairedWines: [],
      pairingText: String,
      productMatches: [
        {
          id: Number,
          title: String,
          description: String,
          price: Number,
          imageUrl: String,
          averageRating: Number,
          ratingCount: Number,
          score: Number,
          link: String,
        },
      ],
    },
    instructions: String,
    analyzedInstructions: [
      {
        name: String,
        steps: [
          {
            number: Number,
            step: String,
            ingredients: [
              {
                id: Number,
                name: String,
                image: String,
              },
            ],
            equipment: [
              {
                id: Number,
                name: String,
                image: String,
              },
            ],
          },
        ],
      },
    ],
    ingredients: [String],
    ingredientsOriginalName: [String],
  },
  {
    collection: 'recipes',
  }
);

RecipeSchema.index(
  {
    title: 'text',
    ingredients: 'text',
    ingredientsOriginalName: 'text',
    cuisines: 'text',
    dishTypes: 'text',
    diets: 'text',
    occasions: 'text',
  },
  {
    name: 'Full text search',
  }
);

mongoose.model('Recipe', RecipeSchema);

// const ExtendedRecipe = mongoose.model("ExtendedRecipe");
//
// ExtendedRecipe.collection.dropIndex("Full text search");
