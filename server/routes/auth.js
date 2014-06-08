var passport = require('passport');
var auth = require('../controllers/auth')

module.exports = function(app) {

	app.post('/api/login', passport.authenticate('local'), auth.login);
	app.post('/api/signup', auth.signup);
	app.get('/api/logout', auth.logout)
};