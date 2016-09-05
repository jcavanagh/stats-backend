var nconf = require('nconf');
var passport = require('passport');

var User = require('models/user');

var FacebookPP = require('passport-facebook').Strategy;
var GooglePP = require('passport-google-oauth').OAuth2Strategy;

function handleAuth(accessToken, refreshToken, profile, done) {
	if(profile && profile.id) {
		console.log(profile);

		//Find a user based on this OAuth ID
		User.findById(profile.id, function(err, user) {
			//Create or update user
			var userData = {
				_id: profile.id,
				name: profile.displayName,
				email: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
				photo: profile.photos && profile.photos[0] ? profile.photos[0].value : '',
				locale: profile._json.locale || profile._json.language || 'en-US',
				link: profile._json.link || profile._json.url || '',
				created: new Date()
			};

			if(user) {
				user.update(userData, function(err) {
					if(err) {
						console.error('Failed to update user', user, err);
						done(err);
					} else {
						done(null, user);
					}
				});
			} else {
				user = new User(userData);
				user.save(function(err) {
					if(err) {
						console.error('Failed to save user', err);
						done(err);
					} else {
						done(null, user);
					}
				});
			}
		});
	} else {
		console.error('No OAuth ID in profile', profile);
		done('No OAuth ID in profile');
	}
}

passport.use(new FacebookPP({
	clientID: nconf.get('facebook.appId'),
	clientSecret: nconf.get('facebook.secret'),
	callbackURL: '/auth/facebook/callback',
	profileFields: [ 'id', 'email', 'gender', 'link', 'locale', 'name', 'picture' ]
}, handleAuth));

passport.use(new GooglePP({
	clientID: nconf.get('google.appId'),
	clientSecret: nconf.get('google.secret'),
	callbackURL: '/auth/google/callback'
}, handleAuth));

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user){
		if(err) {
			done(err, null);
		} else {
			done(null, user);
		}
	});
});