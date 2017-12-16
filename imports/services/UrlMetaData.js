import angular from 'angular';
import angularMeteor from 'angular-meteor';

class UrlMetaDataService {

	constructor() {
		
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

var serviceName = "UrlMetaData";

export default angular.module(serviceName, [
	angularMeteor
	]).service(serviceName, UrlMetaDataService);