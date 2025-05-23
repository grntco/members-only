const { Router } = require("express");
const messagesController = require("../controllers/messagesController");
const signUpController = require("../controllers/signUpController");
const router = Router();

router.get("/", messagesController.allMessagesGet);

router.get("/sign-up", signUpController.signUpGet);
router.post("/sign-up", signUpController.signUpPost);

router.get("/login", (req, res) => res.render("login"));
router.get("/join", (req, res) => res.render("join"));

router.post("/login", () => {});

module.exports = router;
