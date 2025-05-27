require("dotenv").config();
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const validateUser = require("./validation/validate-user");
const validateSecretPassword = require("./validation/validate-secret-password");
const { validationResult } = require("express-validator");
const passport = require("../auth/passport");

const loginGet = (req, res, next) => {
  res.render("login");
};

const loginPost = (req, res, next) => {
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
    failureMessage: "The username or password entered are incorrect.",
  })(req, res, next);
};

// below just in userController?
const logoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};

// TODO: not isAUTH, for general
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

// TODO: isAuth
const joinGet = (req, res, next) => {
  res.render("join");
};

// TODO: also isAuth ?
const joinPost = [
  validateSecretPassword,
  async (req, res, next) => {
    console.log("called function");
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("join", {
        errors: errors.array(),
      });
    }

    try {
      const userId = req.user.id;
      await db.updateUserMember(userId, { isMember: true });
      res.redirect("/");
      // TODO: look up using flash to pass data
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
