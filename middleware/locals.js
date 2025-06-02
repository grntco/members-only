const setLocals = (req, res, next) => {
  res.locals.user = req.user || null;
  
  const successMsgFlash = req.flash("success");
  res.locals.successMsg = successMsgFlash.length > 0 ? successMsgFlash[0] : "";

  next();
};

module.exports = setLocals;
