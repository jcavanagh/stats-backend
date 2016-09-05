var mongoose = require('mongoose');
var nconf = require('nconf');

var host = nconf.get('DB_HOST') || 'localhost';
var port = nconf.get('DB_PORT') || '27017';

mongoose.connect('mongodb://' + host + ':' + port + '/jlcavanagh', {
	autoReconnect: true,
	reconnectTries: Number.MAX_VALUE,
	server: {
		socketOptions: {
			keepAlive: 120
		}
	}
});

module.exports = mongoose.connection.db;
