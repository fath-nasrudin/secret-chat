const bcrypt = require('bcryptjs');

const hash = (string) => {
  return bcrypt.hash(string, 10);
};

const compare = () => {
  return bcrypt.compare(string, hash);
}

module.exports = {
  hash,
  compare,
};
