const { body } = require("express-validator");

module.exports = [
  body("username").trim().notEmpty().withMessage("Please enter a username."),
  body("password").trim().notEmpty().withMessage("Please enter a password."),
];
