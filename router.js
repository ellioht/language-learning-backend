const express = require('express');
const router = express.Router();
const words = require('./wordsController.js');
const review = require('./reviewController.js');

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
router.get('/review', review.getAllReviewWords);

// get a spefific number of review words
router.get('/review/:number', review.getReviewWords);

// post review words
router.post('/review', review.postReviewWords);

// delete all review words
router.delete('/review', review.deleteAllReviewWords);

// delete a review word by id
router.delete('/review/:id', review.deleteReviewWordById);

// get random review word
router.get('/review/random', review.getRandomReviewWord);

module.exports = router;