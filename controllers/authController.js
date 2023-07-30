const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { hashPassword, comparePassword } = require('../helpers/auth');

// Get user endpoint
exports.getUser = async (req, res, next) => {
  console.log("Get user");
  const token = req.cookies.token;
  if (!token) {
    return res.json(null);
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded);
      user.password = undefined;
      // Set the cache-control header to prevent caching
      res.setHeader('Cache-Control', 'no-cache');
      console.log("set no cache");
      return res.json(user);
    } catch (error) {
      return next(createError(500, error));
    }
  }
};

// Login user endpoint
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // check if email exists
  if (!email) {
    return next(createError(400, "Email is required"));
  }
  // check if password exists
  if (!password) {
    return next(createError(400, "Password is required"));
  }
  try {
    // check if user exists in database and select password field to compare
    const user = await User.findOne({ email }).select("+password");
    const isMatch = await comparePassword(password, user.password); // Compare password with hashed password in database
    if (!user) {
      return next(createError(400, "Invalid credentials"));
    }
    // check if password matches
    if (!isMatch) {
      return next(createError(400, "Invalid credentials"));
    } else {
      // create token
      const token = jwt.sign({ _id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });
      // Save token to database
      user.token = token;
      await user.save();
      // Return user and token to client, exclude hashed password
      user.password = undefined;
      // Send token in HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
      });
      res.json(user);
      // send response with token and user info
      // return res.status(200).json({
      //   success: true,
      //   message: "User logged in successfully",
      //   token: token,
      //   user: {
      //     _id: user._id,
      //     name: user.name,
      //     email: user.email,
      //     signup_date: user.signup_date,
      //     words_learned: user.words_learned,
      //   },
      // });
    }
  } catch (error) {
    return next(createError(500, error));
  }
};

// Logout user endpoint
exports.logout = async (req, res, next) => {
  const { id } = req.body;
  console.log(id);

  try {
    const user = await User.findById(id);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Remove words learned from database
    if (user.words_learned) {
      user.words_learned = [];
    }

    // Remove token from database
    if (user.token !== null) {
      user.token = "";
      await user.save();
    }

    console.log("user saved");

    // Remove token from cookie
    res.clearCookie('token');

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return next(createError(500, error));
  }
};

// Signup user endpoint
exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(createError(400, "All fields are required"));
  }

  // if (password !== confirmPass) {
  //   return next(createError(400, "Passwords don't match"));
  // }

  if (!password || password.length < 6) {
    return next(
      createError(400, "Password must be at least 6 characters long")
    );
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return next(createError(400, "User already exists"));
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = await User.create({ name, email, password: hashedPassword });
    await newUser.save();
    // Return new user
    return res.json(newUser);
  } catch (error) {
    return next(createError(500, error));
  }
};

// Delete user endpoint
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(createError(500, error));
  }
};