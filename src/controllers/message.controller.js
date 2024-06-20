const Message = require('../models/message.model');
const { validateString } = require('../middlewares/validator.middleware');
const { checkAuthentication, checkIsAdmin } = require('../utils/authentication/authentication.middleware');
const {asyncHandler} = require('../utils/asyncHandler');

module.exports.getMessages = async (req, res) => {
  const messages = await Message.find().populate('user', 'username');
  res.render('messages/message_list', {
    user: req.user,
    messages,
  })
}

module.exports.postCreateMessage = [
  checkAuthentication(),
  validateString('message'),
  async (req, res, next) => {
    try {
      const message = new Message({
        user: req.user._id,
        text: req.body.message,
      })

      await message.save();
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  }
];

module.exports.getDeleteMessage = [
  checkAuthentication(),
  checkIsAdmin(),
  asyncHandler(async (req, res) => {
    await Message.findByIdAndDelete(req.params.id);
    res.redirect('/');
  })
];