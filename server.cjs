const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const connectToDatabase = require("./Mongo.cjs");
const createError = require("http-errors");

const Word = require("./models/words.js");

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", cors(), (req, res) => {});

app.post("/add", cors(), async (req, res) => {  

});

app.post('/words', async (req, res) => {
  try {
    const wordsData = req.body; // Assuming the JSON data is sent in the request body
    const newWord = new Word(wordsData);

    // Create a new Word document
    await newWord.save();

    return res.status(201).json({ message: 'Words data saved successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to save the words data.' });
  }
});

// post multiple words
app.post('/words/bulk', async (req, res) => {
  
});

// delete all words
app.delete('/words', async (req, res) => {
  try {
    await Word.deleteMany({});
    return res.status(200).json({ message: 'All words data deleted successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to delete all words data.' });
  }
})

// get all words
app.get('/words', async (req, res) => {
  try {
    const words = await Word.find({});
    return res.status(200).json({ words });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to get all words data.' });
  }
});

// get a random word in database
app.get('/words/random', async (req, res) => {
  try {
    const count = await Word.countDocuments();
    const random = Math.floor(Math.random() * count);
    const word = await Word.findOne().skip(random);
    return res.status(200).json({ word });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to get a random word.' });
  }
});
