const { asyncHandler } = require('../utils/asyncHandler');
const { 
  validatePassword, 
  validateUsername, 
  validationResult } = require('../middlewares/validator.middleware');
const {hashPassword} = require('../utils/hasher/hasher.middleware');
const User = require('../models/user.model');
const { passport } = require('../utils/authentication')
const { checkAuthentication } = require('../utils/authentication/authentication.middleware')
const config = require('../config');

module.exports.getSignup = (req, res) => {
  res.render('auth/signup_form', {
    userdata: null,
    errors: null,
  });
};

module.exports.postSignup = [
  validateUsername(),
  validatePassword(),
  // handle error
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('auth/signup_form', {
        userdata: req.body,
        errors: errors.array(),
      })
      return;
    }
    next();
  }),
  hashPassword(),
  // save data
  asyncHandler(async (req, res, next) => {
    const user = new User(req.body);
    await user.save();
    res.redirect('/auth/login');
  })
];

module.exports.getLogin = (req, res) => {
  res.render('auth/login_form', {
    errors: null,
    userdata: null,
    message: req.flash('error'),
  })
}

module.exports.postLogin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
  });

module.exports.getLogout = (req, res) => {
    req.logout( err => {
      if (err) { return next(err) };
      res.redirect('/');
    });  
}

module.exports.getJoinMember = (req, res) => {
  res.render('auth/join_member_form', {
    question: config.memberVerification.question,
  });
};
module.exports.postJoinMember = [
  checkAuthentication(),
  async (req, res) => {
    const { answer } = req.body;
    if ((answer.toLowerCase() !== config.memberVerification.answer.toLowerCase())) {
      res.render('auth/join_member_form', {
        question: config.memberVerification.question,
        errors: [{msg: 'wrong answer', path: 'answer'}],
      });
      return;
    }

    await User.findByIdAndUpdate(req.user._id, {is_member: true})
    res.redirect('/');
  }
];