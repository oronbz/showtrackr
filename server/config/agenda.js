var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var nodemailer = require('nodemailer');

var Show = require('../models/show');

module.exports = function(config) {
	var agenda = require('agenda')({ db: { address: config.db } });

	agenda.define('send email alert', function(job, done) {
		Show.findOne({ name: job.attrs.data }).populate('subscribers').exec(function(err, show) {
			var emails = show.subscribers.map(function(user) {
				return user.email;
			});

			var upcomingEpisode = show.episodes.filter(function(episode) {
				return new Date(episode.firstAired) > new Date();
			})[0];

			var smtpTransport = nodemailer.createTransport('SMTP', {
				service: 'SendGrid',
				auth: { user: 'hslogin', pass: 'hspassword00'}
			});

			var mailOptions = {
				from: 'Oron Ben Zvi <oron@showtrackr.com>',
				to: emails.join(','),
				subject: show.name + ' is starting soon!',
				text: show.name + ' starts in less than 2 hours on ' + show.network + '.\n\n' +
					'Episode ' + upcomingEpisode.episodeNumber + ' Overview\n\n' + upcomingEpisode.overview
			};

			smtpTransport.sendMail(mailOptions, function(error, response) {
				console.log('Message sent: ' + response.message);
				smtpTransport.close();
				done();
			});

		});
	});

	agenda.start();

	agenda.on('start', function(job) {
		console.log("Job %s starting", job.attrs.name);
	});

	agenda.on('complete', function(job) {
		console.log("Job %s finished", job.attrs.name);
	});
};
