var Show = require('../models/show');

exports.subscribe = function(req, res, next) {
	Show.findById(req.body.showId, function(err, show) {
		if (err) return next(err);
		show.subscribers.push(req.user._id);
		show.save(function(err) {
			if (err) return next(err);
			res.send(200);
		});
	});
};

exports.unsubscribe = function(req, res, next) {
	Show.findById(req.body.showId, function(err, show) {
		if (err) return next(err);
		var index = show.subscribers.indexOf(req.user._id);
		show.subscribers.splice(index, 1);
		show.save(function(err) {
			if (err) return next(err);
			res.send(200);
		});
	});
};