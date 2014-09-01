var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shoutbox');
var schema = new mongoose.Schema({
	name: String,
	password: String
});

module.exports = mongoose.model('User', schema);