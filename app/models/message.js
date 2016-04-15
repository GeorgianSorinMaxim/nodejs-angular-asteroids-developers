var mongoose = require('mongoose');

// Define the schema for the Patients model
var message = mongoose.Schema({
	title: { type: String, default: '' },
	body: { type: String, default: '' }
});

module.exports = mongoose.model('Message', message);
