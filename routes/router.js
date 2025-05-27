const { Router } = require("express");
const messagesController = require("../controllers/messages-controller");
const signUpController = require("../controllers/sign-up-controller");
const loginController = require("../controllers/login-controller");
const router = Router();
// const passport = require("../auth/passport");

router.get("/", messagesController.allMessagesGet);

router.get("/sign-up", signUpController.signUpGet);
router.post("/sign-up", signUpController.signUpPost);

router.get("/new-message", messagesController.newMessageGet);
router.post("/new-message", messagesController.newMessagePost);
router.post('/delete/:messageId', messagesController.deleteMessagePost);

router.get("/join", (req, res) => res.render("join"));

router.get("/login", loginController.loginGet);
// calls the local strategy implemented in passport-config
router.post("/login", loginController.loginPost);

router.get("/logout", loginController.logoutGet);

module.exports = router;
