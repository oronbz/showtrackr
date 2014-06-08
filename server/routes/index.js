var shows = require('./shows');
var auth = require('./auth');
var subscriptions = require('./subscriptions');

module.exports = function(app) {
	/*app.use(function(req, res, next) {
		if (req.user) {
			console.log(req.user);
			res.cookie('user', JSON.stringify(req.user));
		}
		next();
	});*/


	shows(app);
	subscriptions(app);
	auth(app);

	app.all('/api/*', function(req, res) {
		res.send(404);
	});

	app.get('*', function(req, res) {
		if (req.user) {
			res.cookie('user', JSON.stringify({
				'email': req.user.email,
				'_id': req.user._id
			}));
		}
		res.redirect('/#' + req.originalUrl);
	});

	app.use(function(err, req, res, next) {
		console.error(err.stack);
		res.send(500, {
			message: err.message
		});
	});
}