const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  learned_date: {
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
    type: [wordSchema],
    default: [],
  },
  words_reviewed: {
    type: [wordSchema],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
