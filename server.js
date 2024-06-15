require('dotenv').config();
const config = require('./src/config');
const logger = require('./src/utils/logger');
const database = require('./src/utils/database');

database.connect();
const app = require('./src/app');

app.listen(config.port, () => {
  logger.info('server is running');
});