const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// PROGRESS

// Check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ error: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(500).send({ error: "Failed to authenticate token." });
    }
    req.user = decoded;
    next();
  });
};

// LEARNED WORDS

// Get words learned (on user account)
exports.getWordsLearned = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    // Send array of learned words
    res.status(200).json({
      success: true,
      words_learned: user.words_learned,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// Set words learned (on user account)
exports.setWordsLearned = async (req, res, next) => {
  let { new_words, user } = req.body;

  console.log(req.body);

  if (!user || !user._id) {
    return next(createError(400, "User ID is required"));
  }

  try {
    const existingUser = await User.findById(user._id);
    if (!existingUser) {
      return next(createError(404, "User not found"));
    }

    const new_words_learned = new_words.map((word) => ({ word }));

    await User.updateOne(
      { _id: user._id },
      { $addToSet: { words_learned: { $each: new_words_learned } } }
    );

    res.status(200).json({
      success: true,
      message: "Words learned updated successfully",
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// Delete all words learned (on user account)
exports.clearWordsLearned = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(createError(404, "User not found"));
  } else {
    user.words_learned = [];
    await user.save();
    res.status(200).json({
      success: true,
      message: "Words learned cleared successfully",
    });
  }
};

// REVIEWED WORDS

// Get words reviewed (on user account)
exports.getWordsReviewed = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    // Send array of reviewed words
    res.status(200).json({
      success: true,
      words_reviewed: user.words_reviewed,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// Set words reviewed (on user account)
exports.setWordsReviewed = async (req, res, next) => {
  let { new_words } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const new_words_reviewed = new_words.map((word) => ({ word }));

    await User.updateOne(
      { _id: req.user.id },
      { $addToSet: { words_reviewed: { $each: new_words_reviewed } } }
    );

    res.status(200).json({
      success: true,
      message: "Words reviewed updated successfully",
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// Delete all words reviewed (on user account)
exports.clearWordsReviewed = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(createError(404, "User not found"));
  } else {
    user.words_reviewed = [];
    await user.save();
    res.status(200).json({
      success: true,
      message: "Words reviewed cleared successfully",
    });
  }
};
