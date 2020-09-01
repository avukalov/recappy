const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/AuthMiddleware');
const FileController = require('../controllers/FileController');

router
    .route('')
    .post(authMiddleware, FileController.upload)
    .get(authMiddleware, FileController.getFiles);
    
module.exports = router;