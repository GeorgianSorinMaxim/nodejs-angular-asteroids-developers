var mongoose = require('mongoose');

// Define the schema for the Patients model
var group = mongoose.Schema({
	name: { type: String, default: '' },
	numberConversion: { type: String, default: '' }
});

module.exports = mongoose.model('Group', group);
