var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var _ = require('lodash');
var sugar = require('sugar');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];
var agenda = require('agenda')({ db: { address: config.db } });

var Show = require('../models/show');

exports.list = function(req, res, next) {
	var query = Show.find();
	if (req.query.genre) {
		query.where({
			genre: req.query.genre
		});
	} else if (req.query.alphabet) {
		query.where({
			name: new RegExp('^' + '[' + req.query.alphabet + ']', 'i')
		});
	} else {
		query.limit(12);
	}

	query.exec(function(err, shows) {
		if (err) return next(err);
		res.send(shows);
	});
};

exports.showById = function(req, res, next) {
	Show.findById(req.params.id, function(err, show) {
		if (err) return next(err);
		res.send(show);
	})
};

exports.create = function(req, res, next) {
	var apiKey = '9EF1D1E7D28FDA0B';
	var parser = xml2js.Parser({
		explicitArray: false,
		normalizeTags: true
	});
	var seriesName = req.body.showName
		.toLowerCase()
		.replace(/ /g, '_')
		.replace(/[^\w-]+/g, '');

	async.waterfall([

		function(callback) {
			request.get('http://thetvdb.com/api/GetSeries.php?seriesname=' + seriesName, function(error, response, body) {
				if (error) return next(error);
				parser.parseString(body, function(err, result) {
					if (!result.data.series) return res.send(400, {
						message: "show wasn't found."
					});
					var seriesId = result.data.series.seriesid || result.data.series[0].seriesid;
					callback(err, seriesId);
				});
			});
		},
		function(seriesId, callback) {
			request.get('http://thetvdb.com/api/' + apiKey + '/series/' + seriesId + '/all/en.xml', function(error, response, body) {
				if (error) return next(error);
				parser.parseString(body, function(err, result) {
					var series = result.data.series;
					var episodes = result.data.episode;
					var show = new Show({
						_id: series.id,
						name: series.seriesname,
						airsDayOfWeek: series.airs_dayofweek,
						airsTime: series.airs_time,
						firstAired: series.firstaired,
						genre: series.genre.split('|').filter(Boolean),
						network: series.network,
						overview: series.overview,
						rating: series.rating,
						ratingCount: series.ratingCount,
						runtime: series.runtime,
						status: series.status,
						poster: series.poster,
						episodes: []
					});
					_.each(episodes, function(episode) {
						show.episodes.push({
							season: episode.seasonnumber,
							episodeNumber: episode.episodenumber,
							episodeName: episode.episodename,
							firstAired: episode.firstaired,
							overview: episode.overview
						});
					});
					callback(err, show);
				})
			});
		},
		function(show, callback) {
			var url = 'http://thetvdb.com/banners/' + show.poster;
			// base64 instead of thetvdb urls
			/*			request({ url: url, encoding: null }, function(error, response, body) {
				show.poster = 'data:' + response.headers['content-type'] + ';base64,' + body.toString('base64');
				callback(error, show);
			});*/

			show.poster = url;
			callback(null, show);
		}
	], function(err, show) {
		if (err) return next(err);
		show.save(function(err) {
			if (err) return next(err);
			var alertDate = Date.create('Next ' + show.airsDayOfWeek + ' at ' + show.airsTime).rewind({ hour: 2 });
			agenda.schedule(alertDate, 'send email alert', show.name).repeatEvery('1 week');
			res.send(200);
		})
	});
};