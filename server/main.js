import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'

import '/imports/api/votes.js';
import '/imports/api/feedback.js';
import '/imports/api/comments.js';
import '/imports/api/opinions.js';

if (!Package.appcache)
	WebApp.connectHandlers.use(function (req, res, next) {
		var params = req.url.split('/');
		var route = params[1];
		var itemId = params[2];

		if (route != 'share' || !itemId) {
			return next();
		}
		console.log('valid share url for topic:', itemId)

		if (Inject.appUrl(req.url)) {
			Inject.rawHead('myData', setMetaTagesDynamically(), res);
		}
		next();

	});

Router.route('/i/:text.png', function () {

	console.log('ironrouter fired')

	var imgContent = Meteor.call('getImage', this.params.text);
	imgContent = new Buffer(imgContent, 'binary');

	this.response.writeHeader('200', {
		'Content-Type': 'image/png',
		'Content-Length': imgContent.length
	});

	this.response.write(imgContent);

	this.response.end();
}, { where: 'server' });

Meteor.startup(() => {

	Meteor.publish('allUsernames', function () {
		return Meteor.users.find({}, {
			fields: {
				'profile.firstName': 1,
				'profile.lastName': 1
			}
		});
	});

	ServiceConfiguration.configurations.upsert(
		{ "service": "linkedin" },
		{
			$set: {
				"clientId": "78akbyufxh1mh8",
				"secret": "OREAQ0srwvcxTZ6W",
				'requestPermissions': ['r_basicprofile', 'r_emailaddress'],
				'loginStyle': 'redirect',
			}
		},
		{ upsert: true }
	);

});

function setMetaTagesDynamically() {
	var tags = `
		<meta property="og:title" content="jouwpers open graph">
		<meta property="og:image" content="http://wij.jouwpers.nl/i/jouwpers%20open%20graph.png">
		`
	return tags;
}