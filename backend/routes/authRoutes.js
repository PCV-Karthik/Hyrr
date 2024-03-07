const router = require("express").Router();
const {signUp,signIn,googleAuth,verifyEmail} = require("../controllers/authController");

router.post("/signup",signUp);
router.post("/signin",signIn);
router.post("/google", googleAuth);
router.post("/verify-email",verifyEmail)
module.exports = router;