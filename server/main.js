import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'

import '../imports/api/posts.js';
import '../imports/api/feedback.js';

import metaGet from 'metaget';

import URL from 'url-parse';

import getLogo from 'website-logo';

Meteor.startup(() => {
	// code to run on server at startup
});


function getBaseUrl(url) {
	
	var parsedUrl = new URL(url);
	return parsedUrl.hostname;
	
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

	getLogo( url, function( error, images ) {

		callback(error, images);

	})
	
}

function fetchMetaData(url, callback) {
	
	metaGet.fetch(url, function (err, meta_response) {
		callback(err, meta_response);
	});
	
}

Meteor.methods({

	getMetaData(url) {
	
		var fetchMetaDataSync = Meteor.wrapAsync(fetchMetaData);
		var metaData = fetchMetaDataSync(url);
		
		var fetchLogoSync = Meteor.wrapAsync(fetchLogo);
		metaData.logos = fetchLogoSync(url);
		
		var validateClearbitSync = Meteor.wrapAsync(validateClearbit);
		metaData.logos.clearbit = validateClearbitSync(url);
	
		console.log(metaData.logos);
		
		return metaData;
		
	}
});




