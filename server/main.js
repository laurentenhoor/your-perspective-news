import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'

import '/imports/api/votes.js';
import '/imports/api/feedback.js';
import '/imports/api/comments.js';
import '/imports/api/opinions.js';

import { Topics } from '/imports/api/topics'
import { Articles } from '/imports/api/articles'

var Jimp = require('jimp');
var path = require('path');

_ = lodash;

if (!Package.appcache)

	WebApp.connectHandlers.use(function (req, res, next) {
		var params = req.url.split('/');
		var route = params[1];
		var itemId = params[2];

		if (route != 'topic' || !itemId) {
			return next();
		}
		var topic = Topics.findOne({ _id: itemId });
		if (!topic) {
			return next();
		}
		var articles = getAllArticlesFromTopic(topic);

		if (Inject.appUrl(req.url)) {
			Inject.rawHead('myData', getMetaTags(topic, articles[0]), res);
		}
		next();

	});

function getAllArticlesFromTopic(topic) {

	var articles = [];
	_.each(topic.articlesByCategory, (categoryBlock) => {
		_.each(categoryBlock.articleIds, (articleId) => {
			articles.push(Articles.findOne({ _id: articleId }))
		})
	})

	return articles;
}

function render(images, callback) {

	var pxWidth = 900;
	var pxHeight = 600;
	var pxLogo = 200;

	new Jimp(pxWidth, pxHeight, (err, canvas) => {
		canvas.background(0xFFFFFFFF);
		canvas.opacity(1);

		if (images.length > 3) {
			var row = 1, column = 1;
			_.each(images, (image, i) => {
				image.cover(pxWidth/2, pxHeight/2, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
				canvas.composite(image, column * (pxWidth/2), row * (pxHeight/2));
				row++;
				if (row == 2) {
					column++ , row = 0
				}
				if (column == 2) {
					column = 0;
				}
			})
		} else if (images.length > 1) {

			images[0].cover(pxWidth/2, pxHeight, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
			canvas.composite(images[0], 0, 0);

			images[1].cover(pxWidth/2, pxHeight, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
			canvas.composite(images[1], pxWidth/2, 0);

		} else if (images.length == 1) {

			images[0].cover(pxWidth, pxHeight, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
			canvas.composite(images[0], 0, 0);

		}

		var logoPath = path.join(__meteor_bootstrap__.serverDir, "../web.browser/app", '/logos/newnews_bw_simplified_circle2.png');

		Jimp.read(logoPath, (error, logo) => {
			if (logo) {
				logo.cover(pxLogo, pxLogo)
				canvas.composite(logo, pxWidth/2-pxLogo/2, pxHeight/2-pxLogo/2);
			}

			canvas.quality(50);
			callback(canvas);
		})

	})
}

function loadImages(urls, callback) {

	var images = [];
	var imageCounter = 0;

	_.each(urls, (url, i) => {

		Jimp.read(url, (error, image) => {
			imageCounter++;
			if (error) {
				console.error(error);
			}
			if (image) {
				// image.opacity(1)	
				images.push(image)
			}
			if (imageCounter == urls.length) {
				callback(images);
			}
		})
	})
}

function sendBackImage(request, canvas) {

	canvas.getBuffer(Jimp.MIME_JPEG, (error, imageBuffer) => {

		request.response.writeHeader('200', {
			'Content-Type': 'image/jpg',
			'Content-Length': imageBuffer.length
		});

		request.response.write(imageBuffer);
		request.response.end();

	});
}


Router.route('/i/:topicId.jpg', function () {

	var request = this;
	var urls = [];

	var topic = Topics.findOne({ _id: request.params.topicId });
	var articles = getAllArticlesFromTopic(topic);
	articles = _.sortBy(articles, 'score', 'asc').reverse();

	_.each(articles, (article) => {
		if (article.imageUrl) {
			urls.push(article.imageUrl);
		}
	})
	urls = urls.slice(0, 4);

	loadImages(urls, (images) => {
		render(images, (canvas) => {
			sendBackImage(request, canvas);
		})
	})

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

function getMetaTags(topic, article) {
	var tags = `
		<meta property="og:title" content="`+ article.title + `">
		<meta property="og:description" content="Zoek mee naar het volledige verhaal achter dit nieuws op Jouwpers.">
		<meta property="og:image" content="`+Meteor.absoluteUrl()+`i/`+ topic._id + `.jpg">
		<meta property="og:image:type" content="image/jpeg" />
		<meta property="og:image:width" content="900">
		<meta property="og:image:height" content="600">
		<meta property="og:type" content="article">
		<meta property="og:url" content="`+Meteor.absoluteUrl()+`topic/`+ topic._id +`/">
		`
	return tags;
}