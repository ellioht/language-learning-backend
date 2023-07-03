const express = require('express');
const router = express.Router();
const words = require('./wordsController.js');

// get all words
router.get('/words', words.getAllWords);

// post multiple words
router.post('/words/bulk', words.postMultipleWords);

// post a word
router.post('/words', words.postWord);

// delete all words
router.delete('/words', words.deleteAllWords);

// delete a word by id
router.delete('/words/:id', words.deleteWordById);

// get random word
router.get('/words/random', words.getRandomWord);