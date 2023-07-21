const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  console.log("logging in");

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
      console.log("password matches");
      // create token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      user.token = token;
      console.log(user.token);
      await user.save();

      // set token as a cookie
      // res.cookie("token", token, {
      //   httpOnly: true,
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      //   sameSite: "none",
      //   secure: true,
      // });
      
      // send response with token and user info
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          signup_date: user.signup_date,
          words_learned: user.words_learned,
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
  let { new_words } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const new_words_learned = new_words
      .filter((word) => {
        // Check if word already exists in words_learned array
        return !user.words_learned.some(
          (learnedWord) => learnedWord.word === word
        );
      })
      .map((word) => ({ word }));

    if (new_words_learned.length > 0) {
      await User.updateOne(
        { _id: req.user.id },
        { $addToSet: { words_learned: { $each: new_words_learned } } }
      );

      res.status(200).json({
        success: true,
        message: "Words learned updated successfully",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No new words learned",
      });
    }
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
