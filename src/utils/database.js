const mongoose = require('mongoose');
const config = require('../config');
const logger = require('./logger');

const connect = () => {
  const mongoDb_uri = config.mongodb.uri;
  mongoose.connect(mongoDb_uri);

  const db = mongoose.connection;
  db.on('error', () => {
    logger.error('failed to connect to database');
  });
  db.on('connected', () => {
    logger.info('database connected');
  })
}

module.exports = {
  connect,
  Schema: mongoose.Schema,
  model: mongoose.model,
}