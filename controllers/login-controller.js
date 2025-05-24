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

const logoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};

module.exports = { loginGet, loginPost, logoutGet };
