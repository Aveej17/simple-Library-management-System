const express = require('express');

const booksController = require('../controllers/books');

const router = express.Router();

router.get('/', booksController.getBooks);
router.post('/', booksController.createBook);
router.put('/', booksController.updateBook);

module.exports = router;