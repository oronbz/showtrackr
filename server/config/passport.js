var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function() {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new LocalStrategy({
		usernameField: 'email'
	}, function(email, password, done) {
		User.findOne({
			email: email
		}, function(err, user) {
			if (err) return done(err);
			if (!user) return done(null, false);
			user.comparePassword(password, function(err, isMatch) {
				if (err) return done(err);
				if (isMatch) return done(null, user);
				return done(null, false);
			});
		});
	}));
}