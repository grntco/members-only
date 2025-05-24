const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};

const isAdmin = (req, res, next) => {
  const admin = req.user.admin;
  //   wtf ^
  if (req.isAuthenticated() && admin) {
    next();
  } else {
    res.status(401).json({
      msg: "You are not an admin",
    });
  }
};

const isMember = (req, res, next) => {
  const member = req.user.member;

  if (req.isAuthenticated() && member) {
    next();
  } else {
    res.status(401).json({
      msg: "You are not a member. Please join the club",
    });
  }
};

module.exports = { isAuth, isAdmin, isMember };
