const isAuth = (req, res, next) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = isAuth;
