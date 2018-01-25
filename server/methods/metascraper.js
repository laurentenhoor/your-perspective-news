import metascraper from '/server/imports/metascraper';

import got from 'got';
import cookie from 'cookie';

Meteor.methods({

	async metascraper(targetUrl) {

		try {
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
		} catch (e) {
			console.log(e);
		}

	}

});

