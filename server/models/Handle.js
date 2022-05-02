const mongoose = require('mongoose');

const HandleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: Number,
  },
});

module.exports = Handle = mongoose.model('handles', HandleSchema);
