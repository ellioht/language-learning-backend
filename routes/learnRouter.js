const router = require("express").Router();
const learn = require("../controllers/learnController");

// Learn words
router.get("/progress/learned", learn.isAuthenticated, learn.getWordsLearned);
router.post("/setwordslearned", learn.isAuthenticated, learn.setWordsLearned);
router.delete(
  "/clearwordslearned",
  learn.isAuthenticated,
  learn.clearWordsLearned
);

// Review words
router.get("/progress/reviewed", learn.isAuthenticated, learn.getWordsReviewed);
router.post("/setwordsreviewed", learn.isAuthenticated, learn.setWordsReviewed);
router.delete(
  "/clearwordsreviewed",
  learn.isAuthenticated,
  learn.clearWordsReviewed
);

module.exports = router;