const database = require('../utils/database');

const Schema = database.Schema;

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  is_admin: {type: Boolean, default: false},
  is_member: {type: Boolean, default: false},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = database.model('User', userSchema);