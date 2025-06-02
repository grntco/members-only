require("dotenv").config();
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const validateSignUp = require("./validation/validate-sign-up");
const validateSecretPassword = require("./validation/validate-secret-password");
const validateLogin = require("./validation/validate-login");
const { validationResult } = require("express-validator");
const passport = require("../auth/passport");

const loginGet = (req, res, next) => {
  const flashErrors = req.flash("error");
  const errors = flashErrors.map((error) => ({ msg: error })); // converts flash errors to be like express-validator errors
  res.render("login", { errors });
};

const loginPost = [
  validateLogin,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("login", {
        errors: errors.array(),
      });
    }

    passport.authenticate("local", {
      failureRedirect: "/login",
      successRedirect: "/",
      failureFlash: true,
    })(req, res, next);
  },
];

const logoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You successfully logged out.");
    res.redirect("/login");
  });
};

const signUpGet = (req, res, next) => {
  res.render("sign-up", { errors: [], formData: {} });
};

const signUpPost = [
  validateSignUp,
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
      req.flash("success", "Thanks for creating an account! Please log in.");
      res.redirect("/login");
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];

const joinGet = (req, res, next) => {
  res.render("join", { errors: [] });
};

const joinPost = [
  validateSecretPassword,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("join", {
        errors: errors.array(),
      });
    }

    try {
      const userId = req.user.id;
      await db.updateUserMember(userId, { isMember: true });
      req.flash(
        "success",
        `Welcome to the club, ${
          req.user.firstName + " " + req.user.lastName
        }! You can now view message times and authors.`
      );
      res.redirect("/");
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];

module.exports = {
  loginGet,
  loginPost,
  logoutGet,
  signUpGet,
  signUpPost,
  joinGet,
  joinPost,
};
