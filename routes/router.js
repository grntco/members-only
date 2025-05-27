const { Router } = require("express");
const userController = require("../controllers/user-controller");
const authRouter = require("./auth-router");
const router = Router();

// GETS
router.get("/sign-up", userController.signUpGet);
router.get("/login", userController.loginGet);

// POSTS
router.post("/sign-up", userController.signUpPost);
router.post("/login", userController.loginPost);

router.use(authRouter);

module.exports = router;
