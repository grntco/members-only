const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const validateUser = require("./validation/validate-user");
const { validationResult } = require("express-validator");

const signUpGet = (req, res, next) => {
  res.render("sign-up");
};

const signUpPost = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", {
        errors: errors.array(),
        formData: req.body,
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await db.insertUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hashedPassword,
        isAdmin: req.body.admin || false,
      });
      res.redirect("/login");
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];

// const loginPost =

module.exports = {
  signUpGet,
  signUpPost,
};
