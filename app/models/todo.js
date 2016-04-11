var mongoose = require('mongoose');

var todo = mongoose.Schema({
	text: { type: String, default: '' }
});

module.exports = mongoose.model('Todo', todo);
