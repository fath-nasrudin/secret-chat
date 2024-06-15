require('dotenv').config();
const config = require('./src/config');
const logger = require('./src/utils/logger');

const app = require('./src/app');

app.listen(config.port, () => {
  logger.info('server is running');
});