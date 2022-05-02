const mongoose = require('mongoose');

const ControlSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Number,
    required: true,
    default:0,
  }
});

module.exports = Control = mongoose.model('controls', ControlSchema);
