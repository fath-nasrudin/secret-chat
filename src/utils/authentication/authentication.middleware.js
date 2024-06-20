module.exports.checkAuthentication = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    };
    res.redirect('/auth/login');
  }
}

module.exports.checkIsAdmin = () => {
  return (req, res, next) => {
    if (req.user.is_admin) {
      return next();
    };
    res.redirect('/');
  }
}
