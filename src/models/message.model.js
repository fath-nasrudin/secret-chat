const database = require('../utils/database');

const Schema = database.Schema;

const messageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  text: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = database.model('Message', messageSchema);