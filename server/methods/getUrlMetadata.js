import metaGet from 'metaget';
import Url from 'url-parse';
import getLogo from 'website-logo';

import suq from 'suq';
import request from 'request';

import metascraper from '/imports/metascraper/metascraper';
const got = require('got');

Meteor.methods({

	async betaScraper(url) {

		// do something
		try {
			var response = await got(url);
			console.log(response.body);
			//=> '<!doctype html> ...'
		} catch (error) {
			console.log(error.response.body);
			//=> 'Internal server error ...'
		}

	},

	getUrlMetadata(url) {

		if (!isValid(url)) {
			return;
		}

		var fetchMetaDataSync = Meteor.wrapAsync(fetchMetaData);

		var metadata = fetchMetaDataSync(url);

		var fetchLogoSync = Meteor.wrapAsync(fetchLogo);
		metadata.logos = fetchLogoSync(url);

		var validateClearbitSync = Meteor.wrapAsync(validateClearbit);
		metadata.logos.clearbit = validateClearbitSync(url);

		return metadata;

	},

	getTestMetadata(url) {
		var fetchSuqSync = Meteor.wrapAsync(fetchSuq);
		return fetchSuqSync(url);

	}
});


function fetchSuq(url, callback) {

	cookieJar = request.jar()
	cookieJar.setCookie(request.cookie('cookieconsent=true'), url);
	cookieJar.setCookie(request.cookie('nl_cookiewall_version=1'), url);

	suq(url, function (err, json, body) {

		if (err) {
			console.log('scraped json is:', JSON.stringify(json, null, 2));
			return callback(true, error);
		}

		return callback(false, json)

	}, { jar: cookieJar });

}

function validateClearbit(url, callback) {

	var clearbitUrl = 'https://logo.clearbit.com/' + getBaseUrl(url);

	HTTP.call('GET', clearbitUrl, {}, (error, result) => {

		if (!error) {
			callback(false, clearbitUrl)
		} else {
			callback(false, null);
		}

	});

}

function fetchLogo(url, callback) {

	getLogo(url, function (error, images) {
		callback(error, images);
	});

}

function fetchMetaData(url, callback) {

	var options = {
		headers: {
			'Cookie': [
				'nl_cookiewall_version=1',
				'cookieconsent=true'
			]
		},
	};
	metaGet.fetch(url, options, function (err, meta_response) {
		callback(false, meta_response);
	});

}

function getBaseUrl(url) {

	var parsedUrl = new Url(url);
	return parsedUrl.hostname;

}

function isValid(url) {

	var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	return urlregex.test(url);

}