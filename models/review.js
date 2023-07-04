const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: false,
  },
  alternatives: {
    type: [String],
    required: true,
    trim: true,
    minlength: 3,
  },
  correct: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    required: true,
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
  }
});

module.exports.Review = mongoose.model("Review", reviewSchema);