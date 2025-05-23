const db = require("../db/queries");

const allMessagesGet = async (req, res, next) => {
  const messages = await db.getAllMessages();
  res.render("index", { messages });
};

const newMessageGet = async (req, res, next) => {
  res.render("sign-up");
};



const allMessagesPost = (req, res, next) => {};

const deleteMessagePost = (req, res, next) => {};

module.exports = {
  allMessagesGet,
  newMessageGet,
  allMessagesPost,
  deleteMessagePost,
};
