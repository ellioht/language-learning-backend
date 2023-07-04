const express = require('express');
const router = express.Router();
const words = require('./wordsController.js');

// WORDS

// get all words
router.get('/words', words.getAllWords);

// post a word
router.post('/words', words.postWord);

// post multiple words
router.post('/words/bulk', words.postMultipleWords);

// delete all words
router.delete('/words', words.deleteAllWords);

// delete a word by id
router.delete('/words/:id', words.deleteWordById);

// get random word
router.get('/words/random', words.getRandomWord);

// REVIEWS

// get all review words
router.get('/review', words.getAllReviewWords);

// post review words
router.post('/review', words.postReviewWords);

module.exports = router;