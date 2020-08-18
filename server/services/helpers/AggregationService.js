class AggregationService {
  static createAggregateMatch(query) {
    const {
      includedIngredients,
      excludedIngredients,
      cuisines,
      dishTypes,
      diets,
      occasions,
      veryHealthy,
    } = query;

    let andAggregate = { $and: [] };

    if (
      !includedIngredients &&
      !excludedIngredients &&
      !cuisines &&
      !dishTypes &&
      !diets &&
      !occasions &&
      veryHealthy === 'false'
    ) {
      return {};
    }
    if (veryHealthy === 'true') {
      andAggregate.$and.push({
        veryHealthy: true,
      });
    }
    if (occasions) {
      andAggregate.$and.push({
        occasions: { $all: occasions.map((occasion) => occasion) },
      });
    }
    if (cuisines) {
      andAggregate.$and.push({
        cuisines: { $all: cuisines.map((cuisine) => cuisine) },
      });
    }
    if (diets) {
      andAggregate.$and.push({
        diets: { $all: diets.map((diet) => diet) },
      });
    }
    if (dishTypes) {
      andAggregate.$and.push({
        dishTypes: { $all: dishTypes.map((dish) => dish) },
      });
    }
    if (excludedIngredients) {
      andAggregate.$and.push({
        'extendedIngredients.name': {
          $not: {
            $all: excludedIngredients.map((ing) => new RegExp(ing)),
          },
        },
      });
    }
    if (includedIngredients) {
      andAggregate.$and.push({
        'extendedIngredients.name': {
          $all: includedIngredients.map((ing) => new RegExp(ing)),
        },
      });
    }

    return andAggregate;
  }

  static createAggregateSort(query) {
    const { sortBy, orderBy } = query;

    switch (sortBy) {
      case 'relevance':
        return { spoonacularScore: parseInt(orderBy) };
      case 'pricePerServing':
        return { pricePerServing: parseInt(orderBy) };
      case 'readyInMinutes':
        return { readyInMinutes: parseInt(orderBy) };
      default:
        return {};
    }
  }
}

module.exports = AggregationService;
