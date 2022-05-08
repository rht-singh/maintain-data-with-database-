const { register } = require("../controller/signup");
const { signIn } = require("../controller/signIn");
const { userInfo } = require("../controller/userinfo");
const { Auth } = require("../middleware/RouterGuard.js");
const router = require("express").Router();

router.post("/signup", register);
router.post("/signin", signIn);
router.get("/user/me", Auth, userInfo);

module.exports = router;
