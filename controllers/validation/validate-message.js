const { body } = require("express-validator");

module.exports = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Please enter a subject for your message.")
    .bail()
    .isLength({ min: 1, max: 30 })
    .withMessage("Your subject must be 30 characters or less. "),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Please enter a message.")
    .bail()
    .isLength({ min: 1, max: 500 })
    .withMessage("Your message must be 500 characters or less."),
];
