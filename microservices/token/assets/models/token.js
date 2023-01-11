const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  owner: { type: String, required: true },
  token: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  createTimestamp: { type: Number, required: true },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;