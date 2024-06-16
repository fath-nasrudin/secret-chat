const hasher = require('./index');

const hashPassword = () => {
  return async (req, res, next) => {
    try {
      if (req.body?.password) {
        req.body.password = await hasher.hash(req.body.password);
      }
      next();
    } catch (error) {
      error.status = 500;
      next(error);
    }
  }
}

module.exports = {
  hashPassword,
}