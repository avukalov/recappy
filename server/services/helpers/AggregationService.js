class AggregationService {
  static createAggregateMatchString(query) {
    let andAggregate = { $and: [] };

    if (
      !query.includedIngredients &&
      !query.excludedIngredients &&
      !query.cuisines &&
      !query.dishTypes &&
      !query.diets &&
      !query.occasions
    ) {
      return {};
    }
    if (query.occasions) {
      andAggregate.$and.push({
        occasions: { $all: query.occasions.map((occasion) => occasion) },
      });
    }
    if (query.cuisines) {
      andAggregate.$and.push({
        cuisines: { $all: query.cuisines.map((cuisine) => cuisine) },
      });
    }
    if (query.diets) {
      andAggregate.$and.push({
        diets: { $all: query.diets.map((diet) => diet) },
      });
    }
    if (query.dishTypes) {
      andAggregate.$and.push({
        dishTypes: { $all: query.dishTypes.map((dish) => dish) },
      });
    }
    if (query.excludedIngredients) {
      andAggregate.$and.push({
        'extendedIngredients.name': {
          $not: {
            $all: query.excludedIngredients.map((ing) => new RegExp(ing)),
          },
        },
      });
    }
    if (query.includedIngredients) {
      andAggregate.$and.push({
        'extendedIngredients.name': {
          $all: query.includedIngredients.map((ing) => new RegExp(ing)),
        },
      });
    }

    return andAggregate;
  }
}

module.exports = AggregationService;
