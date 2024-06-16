const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { authenticate, passport} = require('../utils/authentication')

router.route('/signup')
  .get(authController.getSignup)
  .post(authController.postSignup);

router.route('/login')
  .get(authController.getLogin)
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
  }));

module.exports = router;