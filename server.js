require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const connectToDatabase = require("./Mongo.cjs");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRouter.js");
const cookieParser = require("cookie-parser");

const originAdress = [
  "http://localhost:3000",
  "*"
];

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

app.use(cors({
  origin: originAdress[0],
  credentials: true,
}));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", require("./routes/router.js"));
app.use("/auth", authRoutes);

app.get("/", cors(), (req, res) => {
  res.send("Hello World!");
  console.log("Hello World!");
});
