const { Words } = require("../models/words.js");

const dayInMs = 24 * 60 * 60 * 1000;

const checkLastAccess = async (req, res, next) => {
  const wordOfTheDay = req.cookies.wordOfTheDay;
  const now = new Date();

  console.log("Word of the day:", wordOfTheDay.timestamp);
  console.log("Now:", now);
  
  if (!wordOfTheDay || now - new Date(wordOfTheDay.timestamp) > dayInMs) {
    const words = await Words.find();
    const randomWord = words[Math.floor(Math.random() * words.length)];
    res.cookie("wordOfTheDay", { word: randomWord, timestamp: now.toISOString() }, { maxAge: dayInMs });
    req.wordOfTheDay = randomWord;
  } else {
    req.wordOfTheDay = wordOfTheDay.word;
  }

  next();
};

module.exports = checkLastAccess;