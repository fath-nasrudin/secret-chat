const router = require('express').Router();
const messageController = require('../controllers/message.controller');

router.route('/')
  .get(messageController.getMessages)
  .post(messageController.postCreateMessage);

router.route('/:id/delete')
  .get(messageController.getDeleteMessage);

module.exports = router;