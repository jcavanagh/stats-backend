var personal = require('mtg/api/match/personal.js');
var metagame = require('mtg/api/match/metagame.js');
var db = require('db/db');

module.exports = [{
	route: '/api/mtg/personal/sync',
	method: 'get',
	fn: function fn(req, res, next) {
		personal.sync(function (err, results) {
			res.send({
				error: err,
				data: results
			});
		});
	}
},{
	route: '/api/mtg/metagame/find',
	method: 'get',
	fn: function fn(req, res, next) {
		if (req.params && req.params.query) {
			db.metagame.find(req.params.query, function (err, stats) {
				res.send({
					error: err,
					data: stats
				});
			});
		} else {
			res.status(400);
			res.send('Please include a mongodb query in the request');
		}
	}
},{
	route: '/api/mtg/personal/find',
	method: 'get',
	fn: function fn(req, res, next) {
		if (req.params && req.params.query) {
			db.personal.find(req.params.query, function (err, stats) {
				res.send({
					error: err,
					data: stats
				});
			});
		} else {
			res.status(400);
			res.send('Please include a mongodb query in the request');
		}
	}
}];