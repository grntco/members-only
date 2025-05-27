const { isAuth, isAdmin } = require("../auth/auth-utils");
const userController = require("../controllers/user-controller");
const messagesController = require("../controllers/messages-controller");
const { Router } = require("express");
const authRouter = Router();

authRouter.use(isAuth);

// GETS
authRouter.get("/", messagesController.allMessagesGet);
authRouter.get("/new-message", messagesController.newMessageGet);
authRouter.get("/join", userController.joinGet);
authRouter.get("/logout", userController.logoutGet);

// POSTS
authRouter.post("/join", userController.joinPost);
authRouter.post("/new-message", messagesController.newMessagePost);
authRouter.post("/delete/:messageId", messagesController.deleteMessagePost);

module.exports = authRouter;
