const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    res.send('Root Page');
  });

router.use('/auth', require('./auth.route'));

module.exports = router;