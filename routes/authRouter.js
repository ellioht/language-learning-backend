const router = require("express").Router();
const auth = require("../controllers/authController");

router.post("/login", auth.login);
router.post("/signup", auth.signup);
router.post("/logout", auth.logout);

module.exports = router;