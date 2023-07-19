const mongoose = require("mongoose");

const learnedWordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  learned_date: {
    type: Date,
    default: Date.now,
  },
});

const reviewedWordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  reviewed_date: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  signup_date: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
    default: "",
  },
  words_learned: {
    type: [learnedWordSchema],
    default: [],
  },
  words_reviewed: {
    type: [reviewedWordSchema],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
