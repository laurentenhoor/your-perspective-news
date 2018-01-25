import metascraper from '/server/imports/metascraper';

import got from 'got';
import cookie from 'cookie';

import urlPreprocessing from '/server/imports/metascraper/url-preprocessing';

Meteor.methods({

	async metascraper(targetUrl) {

		try {
			targetUrl = await urlPreprocessing(targetUrl);

			const {body: html, url} = await got(targetUrl, {
				headers: {
					cookie: [
						cookie.serialize('nl_cookiewall_version', '1'),
						cookie.serialize('cookieconsent', 'true')
					]
				},
				followRedirect : true
			});
			return await metascraper({html, url});
		} catch (error) {
			console.log(error);
		}

	}

});

