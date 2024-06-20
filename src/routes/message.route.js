const router = require('express').Router();
const messageController = require('../controllers/message.controller');

router.route('/')
  .get(messageController.getMessages)
  .post(messageController.postCreateMessage);

module.exports = router;