const express = require('express');
const router = express.Router();

const UserRoutes = require('./UserRoutes');
const RecipeRoutes = require('./RecipeRoutes');
const FileRoutes = require('./FileRoutes');

router.use('/user', UserRoutes);
router.use('/recipe', RecipeRoutes);
router.use('/file', FileRoutes);

module.exports = router;
