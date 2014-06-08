var subscriptions = require('../controllers/subscriptions');
var auth = require('../controllers/auth')

module.exports = function(app) {
	app.post('/api/subscribe', auth.ensureAuthenticated, subscriptions.subscribe);
	app.post('/api/unsubscribe', auth.ensureAuthenticated, subscriptions.unsubscribe);
}