const createError = require("http-errors");

const { Review } = require("./models/review.js");

// get all review words
exports.getAllReviewWords = async (req, res, next) => {
  try {
    const review = await Review.find();
    res.send(review);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// post review words
exports.postReviewWords = async (req, res, next) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.send(newReview);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// get a random word in review database
exports.getRandomReviewWord = async (req, res, next) => {
  try {
    const words = await Words.find({ review: true });
    const randomWord = words[Math.floor(Math.random() * words.length)];
    res.send(randomWord);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// delete all review words
exports.deleteAllReviewWords = async (req, res, next) => {
  try {
    await Words.deleteMany({ review: true });
    res.send("All review words deleted.");
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// delete a review word by id
exports.deleteReviewWordById = async (req, res, next) => {
  try {
    const word = await Words.findByIdAndDelete(req.params.id);
    if (!word) {
      return res.status(404).send("Word not found.");
    }
    res.send(word);
  } catch (error) {
    return next(createError(500, error.message));
  }
};
