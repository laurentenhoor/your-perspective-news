import { Meteor } from 'meteor/meteor';

export default class MetadataService {

	constructor($loader) {
		'ngInject';
		this.$loader = $loader;
	}
	
	getArticleFromUrl = function (url, cb) {

		console.log('Url input: ' + url);

		if (!this.isValidUrl(url)) {
			return;
		}

		self = this;
		self.$loader.start();

		Meteor.call('getUrlMetadata', url, (error, result) => {
			
			if (error) {
				console.error(error);
				self.$loader.stop();
				return cb(error);
			}

			let article = self.createArticle(url, result);
			self.$loader.stop();
			return cb(false, article);

		});
	}

	isValidUrl(url) {

		console.log('isValidUrl()');
		console.log(url);

		var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
		return urlregex.test(url);

	}

	createArticle(url, result) {
		
		var article = {};
		
		article.url = url;
		article.logoUrl = result.logos.clearbit || result.logos.icon;
		article.description = (result['twitter:description'] || result['og:description'] || result['Description'] || result['description'])// .replace(/<\/?[^>]+(>|$)/g,"");
		article.title = (result['gwa_contentTitle'] || result['twitter:title'] || result['og:title'] || result['Title'])// .replace(/<\/?[^>]+(>|$)/g,"");
		article.publisher = result['og:site_name'] || result['application-name'] || result['app-name'];
		article.publishedAt = result['article:published'];		
		article.videoUrl = result['twitter:player'];
		article.imageUrl = result['og:image'] || result['twitter:image'] || result['twitter:image:src'];
		
		if (!article.imageUrl) {
			article.imageUrl = 'http://www.workhappynow.com/wp-content/foggy-mountains-blue-595.jpeg';
		}
		if (!article.title) {
			article.title = "Dit artikel kunnen wij helaas niet vinden."
		}
		
		if (result['twitter:player']) {
			article.imageUrl = result['twitter:image'];
			article.url = null;
			article.videoUrl = article.videoUrl + '?&theme=dark&autohide=2&modestbranding=0&fs=1&showinfo=0&rel=0&playsinline=1';
			if (article.publisher == 'YouTube') {
				article.logoUrl = 'https://logo.clearbit.com/www.youtube.com';
				
			}
		}
		
//		article.rawMetadata = result;
		
		return article;
		
	}
}