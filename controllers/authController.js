const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

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
    const isMatch = await bcrypt.compare(password, user.password);

    if (!user) {
      return next(createError(400, "Invalid credentials"));
    }

    // check if password matches
    if (!isMatch) {
      return next(createError(400, "Invalid credentials"));
    } else {
      // create token 
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      user.token = token;

      await user.save();

      // send response with token and user info
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    return next(createError(500, error));
  }
};

exports.logout = async (req, res, next) => {
  const { id } = req.body;

  try {
    const user = await User.findById(id);

    user.token = "";

    await user.save();

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return next(createError(500, error));
  }
};

exports.signup = async (req, res, next) => {
  const { name, email, password, confirmPass } = req.body;

  if (!name || !email || !password || !confirmPass) {
    return next(createError(400, "All fields are required"));
  }

  if (password !== confirmPass) {
    return next(createError(400, "Passwords don't match"));
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return next(createError(400, "User already exists"));
    }
    const newUser = new User({
      name,
      email,
      password,
    });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    newUser.password = hashedPassword;

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });

  } catch (error) {
    return next(createError(500, error));
  }
};