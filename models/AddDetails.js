const mongoose = require('mongoose');

// Define the schema for additional details
const additionalDetailsSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  college: { type: String, required: true },
  designation: { type: String, required: true },
  github: { type: String },
  mobile: { type: String, required: true },
  whatsapp: { type: String },
});

// Create and export the AdditionalDetails model
module.exports = mongoose.model('AdditionalDetails', additionalDetailsSchema);
