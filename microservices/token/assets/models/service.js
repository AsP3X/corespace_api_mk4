const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  startTimestamp: { type: Number, required: true },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;