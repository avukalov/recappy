const express = require('express');
const router = express.Router();

const UserRoutes = require('./UserRoutes');
const RecipeRoutes = require('./RecipeRoutes');

router.use('/user', UserRoutes);
router.use('/recipe', RecipeRoutes);

module.exports = router;
