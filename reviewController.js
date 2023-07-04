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