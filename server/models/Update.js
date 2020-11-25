const mongoose = require('mongoose');

const UpdateSchema = new mongoose.Schema({
  rescueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rescue',
  },
  timestamp: Date,
  update: String,
});

module.exports = mongoose.model('Update', UpdateSchema);
