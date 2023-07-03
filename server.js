const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const connectToDatabase = require("./Mongo.cjs");
const createError = require("http-errors");
const bodyParser = require('body-parser');

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

app.use(bodyParser.json());

app.use("/api", require("./router.js"));

app.get("/", cors(), (req, res) => {});
