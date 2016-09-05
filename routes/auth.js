var db = require('db/db');
var passport = require('passport');

var auth = require('auth/auth');

module.exports = [{
	route: '/auth/facebook',
	method: 'get',
	fn: passport.authenticate('facebook', { scope: [ 'public_profile email' ]})
},{
	route: '/auth/facebook/callback',
	method: 'get',
	fn: passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/login'
	})
},{
	route: '/auth/google',
	method: 'get',
	fn: passport.authenticate('google', { scope: [ 'openid profile email' ]})
},{
	route: '/auth/google/callback',
	method: 'get',
	fn: passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login'
	})
},{
	route: '/auth/profile',
	method: 'get',
	fn: function fn(req, res, next) {
		res.send(req.user);
	}
},{
	route: '/auth/logout',
	method: 'get',
	fn: function fn(req, res, next) {
		req.logout();
		res.redirect('/login');
	}
}];