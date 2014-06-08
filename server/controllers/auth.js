var User = require('../models/user');

exports.ensureAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) next();
	else res.send(401);	
};

exports.login = function(req, res) {
	res.cookie('user', JSON.stringify(req.user));
	res.send(req.user);
};

exports.signup = function(req, res, next) {
	var user = new User({
		email: req.body.email,
		password: req.body.password
	});
	user.save(function(err) {
		if (err) return next(err);
		res.send(200);
	});
};

exports.logout = function(req, res, next) {
	req.logout();
	res.send(200);
};