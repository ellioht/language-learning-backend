const router = require("express").Router();
const auth = require("../controllers/authController");

router.post("/login", auth.login);
router.post("/signup", auth.signup);
router.post("/logout", auth.logout);

router.get("/progress/learned", auth.isAuthenticated, auth.getWordsLearned);
router.post("/setwordslearned", auth.isAuthenticated, auth.setWordsLearned);
router.delete(
  "/clearwordslearned",
  auth.isAuthenticated,
  auth.clearWordsLearned
);

module.exports = router;
