const router = require('express').Router();

router.use((req, res, next) => {
  res.locals = {
    errors: null,
    user: req.user ? req.user: null,
    userdata: null,
  }
  next();
})

router.route('/')
  .get((req, res) => {
    res.send('Root Page');
  });

router.use('/auth', require('./auth.route'));

module.exports = router;