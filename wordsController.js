const createError = require("http-errors");

const { Words } = require("./models/words.js");

// get all words
exports.getAllWords = async (req, res, next) => {
  try {
    const words = await Words.find();
    res.send(words);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// post a word
exports.postWord = async (req, res, next) => {
  console.log(req.body);
  try {
    const newWord = new Words(req.body);
    await newWord.save();
    res.send(newWord);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// post multiple words
exports.postMultipleWords = async (req, res, next) => {
  try {
    const newWords = await Words.insertMany(req.body);
    res.send(newWords);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// delete all words
exports.deleteAllWords = async (req, res, next) => {
  try {
    await Words.deleteMany();
    res.send("All words deleted.");
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// delete a word by id
exports.deleteWordById = async (req, res, next) => {
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

// get a random word in database
exports.getRandomWord = async (req, res, next) => {
  try {
    const words = await Words.find();
    const randomWord = words[Math.floor(Math.random() * words.length)];
    res.send(randomWord);
  } catch (error) {
    return next(createError(500, error.message));
  }
};
