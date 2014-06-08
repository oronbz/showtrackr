var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/agenda')(config);

require('./server/routes')(app, config);

app.listen(config.port, function() {
	console.log('Express server listening on port ' + config.port);
});