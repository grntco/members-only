const { body } = require("express-validator");

module.exports = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Please enter a first name.")
    .isLength({ min: 1, max: 30 })
    .withMessage("Your title must be 30 characters or less. "),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Please enter a message.")
    .isLength({ min: 1, max: 500 })
    .withMessage("Your message must be 500 characters or less."),
];
