const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    default:"off",
  },
  level: {
    type: Number,
    required: true,
  },
});

module.exports = Device = mongoose.model('devices', DeviceSchema);
