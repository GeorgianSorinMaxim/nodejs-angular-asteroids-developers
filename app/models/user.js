var mongoose = require('mongoose');

// Define the schema for the Patients model
var users = mongoose.Schema({
	employeeId: { type: String, default: '' },
    firstname: { type: String, default: '' },
    lastname: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    role: { type: String, default: '' },
    username: { type: String, default: '' },
    password: { type: String, default: '' },
    organisation: { type: String, default: '' },
});

module.exports = mongoose.model('Users', users);
