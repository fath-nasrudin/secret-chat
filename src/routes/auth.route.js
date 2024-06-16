const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.route('/signup')
  .get(authController.getSignup)
  .post(authController.postSignup);

module.exports = router;