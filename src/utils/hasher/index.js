const bcrypt = require('bcryptjs');

const hash = (string) => {
  return bcrypt.hash(string, 10);
};

const compare = async (string, hashedString) => {
  return await bcrypt.compare(string, hashedString);
}

module.exports = {
  hash,
  compare,
};
