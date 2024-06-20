const Message = require('../models/message.model');
const { validateString } = require('../middlewares/validator.middleware');
const { checkAuthentication } = require('../utils/authentication/authentication.middleware');

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