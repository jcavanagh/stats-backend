var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	_id: String,
	name: String,
	email: String,
	photo: String,
	locale: String,
	link: String,
	created: Date,
	mtg: {
		dciNumber: String,
		dciUsername: String,
		dciPassword: String
	}
});

module.exports = mongoose.model('User', UserSchema);
