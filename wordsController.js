const createError = require("http-errors");

const { Words } = require("./models/words.js");

// get all words
exports.getAllWords = async (req, res, next) => {
  try {
    const words = await Word.find();
    res.send(words);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// post a word
exports.postWord = async (req, res, next) => {
  try {
    const newWord = new Words({
      language: req.body.language,
    });
    await newWord.save();
    res.send(newWord);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// post multiple words
// exports.postMultipleWords = async (req, res, next) => {
//   try {
//     const wordsData = req.body;
//     await Word.insertMany(wordsData);

//     return res
//       .status(201)
//       .json({ message: "Words data saved successfully." });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json({ error: "Failed to save the words data." });
//   }
// };

// delete all words
// exports.deleteAllWords = async (req, res, next) => {
//   try {
//     await Word.deleteMany({});
//     return res
//       .status(200)
//       .json({ message: "All words data deleted successfully." });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json({ error: "Failed to delete all words data." });
//   }
// };

// delete a word by id
// exports.deleteWordById = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     await Word.findByIdAndDelete(id);
//     return res
//       .status(200)
//       .json({ message: "Word deleted successfully." });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Failed to delete the word." });
//   }
// };

// get a random word in database
// exports.getRandomWord = async (req, res, next) => {
//   try {
//     const count = await Word.countDocuments();
//     const random = Math.floor(Math.random() * count);
//     const word = await Word.findOne().skip(random);
//     return res.status(200).json({ word });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Failed to get a random word." });
//   }
// };
