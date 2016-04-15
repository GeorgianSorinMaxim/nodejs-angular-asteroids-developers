var mongoose = require('mongoose');

// Define the schema for the Patients model
var device = mongoose.Schema({
	regid: { type: String, default: '', unique: true},
	uuid: { type: String, default: '', unique: true }
});

module.exports = mongoose.model('Device', device);
