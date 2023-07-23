const router = require("express").Router();
const auth = require("../controllers/authController");
const authChecker = require("../middleware/authChecker");

// User Authentication
router.get("/user", auth.getUser);
router.post("/login", auth.login);
router.post("/register", auth.signup);
router.post("/logout", auth.logout);
router.delete("/user/:id", auth.deleteUser);

module.exports = router;
