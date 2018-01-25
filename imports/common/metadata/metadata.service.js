import { Meteor } from 'meteor/meteor';

export default class MetadataService {

	constructor($loader, $imagePreloader) {
		'ngInject';
		this.$loader = $loader;
		this.$imagePreloader = $imagePreloader;
	}
	
	getArticleFromUrl = function (url, callback) {
		if (!this.isValidUrl(url)) {
			console.warn('invalid url')
			return;
		}

		self = this;
		self.$loader.start();

		Meteor.call('metaScraper', url, function (error, article) {

			if (error) {
				console.error(error);
				self.$loader.stop();
				return;
			}

			self.$imagePreloader.preloadImages([article.imageUrl])
				.then(
					function handleResolve( imageLocations ) {
						console.info( "Image loaded succesfully" );
						
						self.$loader.stop();
						return callback(false, article)
					},
					function handleReject( imageLocation ) {
						console.log('Image not loaded succesfully', imageLocation)
						Meteor.call('getImage', imageLocation, (error, imageBase64) => {
							if (error) {
								console.error(error)
							}
							article.imageUrl = imageBase64;
							self.$loader.stop();
							return callback(false, article)
						})
					}
				);

		});

	}

	isValidUrl(url) {

		console.log('isValidUrl()');
		console.log(url);

		var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
		return urlregex.test(url);

	}

	
}