var shows = require('../controllers/shows');

module.exports = function(app) {
	app.get('/api/shows', shows.list);

	app.get('/api/shows/:id', shows.showById);

	app.post('/api/shows', shows.create);

}