const db = require("../../db/queries");
const { body } = require("express-validator");

module.exports = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("Please enter a first name.")
    .isLength({ min: 1, max: 16 })
    .withMessage("A name must be between 1 and 16 characters."),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Please enter a last name.")
    .isLength({ min: 1, max: 16 })
    .withMessage("A name must be between 1 and 16 characters."),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Please enter a username.")
    .isLength({ min: 1, max: 16 })
    .withMessage("A username must be between 1 and 16 characters.")
    .custom(async (value) => {
      const existingUser = await db.getUserByUsername(value);
      if (existingUser) {
        throw new Error("The username provided is already taken.");
      }
      return true;
    })
    .withMessage("The username provided is already taken."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Please enter a password.")
    .isLength({ min: 8, max: 20 })
    .withMessage("A password must be between 8 and 20 characters"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error(
        "The passwords do not match. Please enter the same password."
      );
    }
    return true;
  }),
];
