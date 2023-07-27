const router = require("express").Router();
const learn = require("../controllers/learnController");
const authChecker = require("../middleware/authChecker");

// Learn words
router.get("/progress/learned", learn.getWordsLearned);
router.post("/setwordslearned", learn.setWordsLearned);
router.delete(
  "/clearwordslearned",
  learn.isAuthenticated,
  learn.clearWordsLearned
);

// Review words
router.get("/progress/reviewed", learn.getWordsReviewed);
router.post("/setwordsreviewed", learn.setWordsReviewed);
router.delete(
  "/clearwordsreviewed",
  learn.isAuthenticated,
  learn.clearWordsReviewed
);

module.exports = router;
