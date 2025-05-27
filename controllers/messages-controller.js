const db = require("../db/queries");
const validateMessage = require("./validation/validate-message");
const { validationResult } = require("express-validator");
const { isAdmin } = require("../auth/auth-utils");
const { format } = require("date-fns");

const allMessagesGet = async (req, res, next) => {
  const rawMessages = await db.getAllMessages();
  const messages = rawMessages.map((message) => {
    return {
      ...message,
      date: format(new Date(message.date), "PPp"),
    };
  });

  res.render("index", {
    messages,
    isMember: req.user?.isMember,
    isAdmin: req.user?.isAdmin,
  });
};
const newMessageGet = (req, res, next) => {
  res.render("new-message");
};

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

      await db.insertMessage(data);
      res.redirect("/");
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];

const deleteMessagePost = [
  isAdmin,
  async (req, res, next) => {
    try {
      const messageId = req.params.messageId;
      await db.deleteMessage(messageId);
      res.redirect("/");
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];

module.exports = {
  newMessageGet,
  newMessagePost,
  allMessagesGet,
  deleteMessagePost,
};
