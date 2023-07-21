const router = require("express").Router();
const auth = require("../controllers/authController");
const authChecker = require("../middleware/authChecker");

router.post("/login", auth.login);
router.post("/signup", auth.signup);
router.post("/logout", auth.logout);

// router.post("/user", authChecker, auth.getUser);

// Learn words
router.get("/progress/learned", auth.isAuthenticated, auth.getWordsLearned);
router.post("/setwordslearned", auth.isAuthenticated, auth.setWordsLearned);
router.delete(
  "/clearwordslearned",
  auth.isAuthenticated,
  auth.clearWordsLearned
);

// Review words
router.get("/progress/reviewed", auth.isAuthenticated, auth.getWordsReviewed);
router.post("/setwordsreviewed", auth.isAuthenticated, auth.setWordsReviewed);
router.delete(
  "/clearwordsreviewed",
  auth.isAuthenticated,
  auth.clearWordsReviewed
);

module.exports = router;
