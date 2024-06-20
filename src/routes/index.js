const router = require('express').Router();

router.use((req, res, next) => {
  res.locals = {
    errors: null,
    user: req.user ? req.user: null,
    userdata: null,
    
    // for verification
    question: null,
    answer: null,
  }
  next();
})

router.route('/')
  .get((req, res) => {
    res.redirect('/messages');
  });

router.use('/auth', require('./auth.route'));
router.use('/messages', require('./message.route'));

module.exports = router;