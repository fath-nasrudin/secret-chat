const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.route('/signup')
  .get(authController.getSignup)
  .post(authController.postSignup);

router.route('/login')
  .get(authController.getLogin)
  .post(authController.postLogin);

router.route('/logout')
  .get(authController.getLogout);

router.route('/join-member')
  .get(authController.getJoinMember)
  .post(authController.postJoinMember);

module.exports = router;