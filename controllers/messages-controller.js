const db = require("../db/queries");
const validateMessage = require("./validation/validate-message");
const { validationResult } = require("express-validator");
const { isAuth } = require("../auth/auth-utils");

const allMessagesGet = [
  isAuth,
  async (req, res, next) => {
    console.log(req.user);
    const messages = await db.getAllMessages();
    res.render("index", { messages });
  },
];

const newMessageGet = [
  isAuth,
  (req, res, next) => {
    res.render("new-message");
  },
];

const newMessagePost = [
  validateMessage,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("new-message", {
        errors: errors.array(),
        formData: req.body,
      });
    }

    try {
      const data = {
        userId: req.user.id,
        title: req.body.title,
        content: req.body.content,
      };
      console.log(data);

      await db.insertMessage(data);
      res.redirect("/");
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];

const deleteMessagePost = (req, res, next) => {};

module.exports = {
  newMessageGet,
  newMessagePost,
  allMessagesGet,
  deleteMessagePost,
};
