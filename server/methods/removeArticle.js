import { Topics } from '../../imports/api/topics.js';
import { Articles } from '../../imports/api/articles.js';

Meteor.methods({
	
	removeArticle(topicId, articleId) {
		
		console.log(topicId);
		console.log(articleId);
		
		Topics.update({
			_id: topicId,
			'articlesByCategory.articleIds' : articleId
			}, {$pull: {'articlesByCategory.$.articleIds': articleId}
		});
		
		
		
		
	}
	
});


var emptyCats = Topics.find({ 'articlesByCategory.articleIds': { $gt: [] } }).fetch()

console.log(emptyCats);