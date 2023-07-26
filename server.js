require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3001;
const connectToDatabase = require("./Mongo.cjs");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRouter.js");
const learnRoutes = require("./routes/learnRouter.js");
const cookieParser = require("cookie-parser");

const originAdress = ["http://localhost:3000", "*"];

// Initialize Express
const app = express();

// Connect to the Mongo DB
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "https://language-learning-app.onrender.com/"],
    credentials: true,
  })
);
app.use(express.json()); // Allows us to parse JSON in request bodies (req.body)
app.use(cookieParser()); // Allows us to parse cookies in request headers (req.cookies)
app.use(express.urlencoded({ extended: true })); // Allows us to parse URL-encoded request bodies (req.body)
app.use(bodyParser.json());

// Routes
app.use("/api", require("./routes/reviewRouter.js"));
app.use("/auth", authRoutes);
app.use("/auth", learnRoutes);

app.get("/", cors(), (req, res) => {
  res.send("Hello World!");
  console.log("Hello World!");
});
