const isAdmin = (req, res, next) => {
  const admin = req.user.isAdmin;
  if (req.isAuthenticated() && admin) {
    next();
  } else {
    res.status(401).json({
      msg: "You are not an admin",
    });
  }
};

module.exports = isAdmin;
