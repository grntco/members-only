require("dotenv").config();
const { body } = require("express-validator");

module.exports = [
  body("secretPassword")
    .trim()
    .notEmpty()
    .withMessage("Please enter a secret password.")
    .custom((value) => {
      if (value !== process.env.MEMBER_SECRET_PASSWORD) {
        throw new Error("Oh no! That's not the secret password.");
      }
      return true;
    }),
];
