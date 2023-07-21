const jwt = require("jsonwebtoken");
require("dotenv").config();
const createError = require("http-errors");

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(createError(401, "User not authenticated"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(createError(401, "User not authenticated"));
  }
}

module.exports = isAuthenticated;