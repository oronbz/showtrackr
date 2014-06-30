var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var session = require('express-session');
var passport = require('passport');

module.exports = function(app, config) {
	app.use(compress());
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(cookieParser());
	app.use(session({
		secret: 'dancing on rainbows'
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.get('/', function(req, res) {
		if (req.user) {
			res.cookie('user', JSON.stringify({
				'email': req.user.email,
				'_id': req.user._id
			}));
		}

		res.sendfile('./public/index.html');
	});
	app.use(express.static(config.rootPath + '/public', {
		maxAge: 86400000
	}));

	app.get('/', function(req, res) {

		if (req.user) {
			res.cookie('user', JSON.stringify(req.user));
		}
	});
};