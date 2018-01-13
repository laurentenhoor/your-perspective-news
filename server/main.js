import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'

import '/imports/api/votes.js';
import '/imports/api/feedback.js';
import '/imports/api/comments.js';
import '/imports/api/opinions.js';

var Jimp = require('jimp');

if (!Package.appcache)
	WebApp.connectHandlers.use(function (req, res, next) {
		var params = req.url.split('/');
		var route = params[1];
		var itemId = params[2];

		// if (route != 'share' || !itemId) {
		// 	return next();
		// }
		console.log('valid share url for topic:', itemId)

		if (Inject.appUrl(req.url)) {
			Inject.rawHead('myData', setMetaTagesDynamically(itemId), res);
		}
		next();

	});


Router.route('/i/:text.png', function () {

	console.log('ironrouter fired')

	var self = this;
	var url = "http://img.humo.be/q100/w1200/h628/img_178/1789097.jpg"

	Jimp.read(url, function (error, image) {

		if (error) {
			return console.error(error);;
		}

		image.cover(600, 600);

		Jimp.loadFont(Jimp.FONT_SANS_128_BLACK)
			.then((font) => {

				image.print(font, 20, 300, self.params.text)
				// image.color([{ apply: 'darken', params: [30] }])

				image.getBuffer(Jimp.AUTO, (error, imageBuffer) => {

					self.response.writeHeader('200', {
						'Content-Type': 'image/png',
						'Content-Length': imageBuffer.length
					});

					self.response.write(imageBuffer);
					self.response.end();

				});
			});

	});

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

function setMetaTagesDynamically(itemId) {
	var tags = `
		<meta property="og:title" content="jouwpers open graph">
		<meta property="og:image" content="http://wij.jouwpers.nl/i/`+ itemId + `.png">
		<meta property="og:image:width" content="600">
		<meta property="og:image:height" content="600">
		`
	return tags;
}