import React from 'react';

function FiltersListGrid() {
  return (
    <div>
      {/* {!loading ? ( */}
      {/* <Grid container item direction="row" justify="space-evenly">
            <Grid item sm={2}>
              <Typography variant="button" className={classes.category}>
                Cuisines
              </Typography>
              <FilterList
                reset={query.reset}
                type={CUISINES}
                filter={filters.cuisines}
              />
            </Grid>
            <Grid item sm={2}>
              <Typography variant="button" className={classes.category}>
                Dish Types
              </Typography>
              <FilterList
                reset={query.reset}
                type={DISH_TYPES}
                filter={filters.dishTypes}
              />
            </Grid>
            <Grid item sm={2}>
              <Typography variant="button" className={classes.category}>
                Diets
              </Typography>
              <FilterList
                reset={query.reset}
                type={DIETS}
                filter={filters.diets}
              />
            </Grid>
            <Grid item sm={2}>
              <Typography variant="button" className={classes.category}>
                Occasions
              </Typography>
              <FilterList
                reset={query.reset}
                type={OCCASIONS}
                filter={filters.occasions}
              />
            </Grid>
          </Grid> */}
      {/* ) : (
            <h1>Loading Filters ....</h1>
          )} */}
    </div>
  );
}

export default FiltersListGrid;
