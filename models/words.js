const mongoose = require('mongoose');

const wordsSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  definition: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  example: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  translation: {
    type: {
      spanish: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
      },
      french: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
      },
      german: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
      },
      italian: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
      },
      portuguese: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
      },
    },
    required: true,
  },
});

const Words = mongoose.model('Words', wordsSchema);
module.exports = Words;