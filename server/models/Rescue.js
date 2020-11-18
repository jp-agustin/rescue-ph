const mongoose = require('mongoose');

const RescueSchema = new mongoose.Schema({
  contactPerson: String,
  contactNumber: String,
  location: {
    lat: Number,
    lon: Number,
    address: String
  },
  noOfPerson: Number,
  additionalInfo: String,
  isRescued: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Rescue', RescueSchema);
