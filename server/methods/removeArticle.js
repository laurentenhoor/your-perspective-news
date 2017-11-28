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
		
		
		var topic = Topics.findOne({
			_id: topicId
		});
		
		
		var totalAmountOfArticles = 0;
		var safeToDelete  = false;
		
		_.forEach(topic.articlesByCategory, function(category){
			
			console.log(category);
			totalAmountOfArticles = totalAmountOfArticles + category.articleIds.length;
			
			if ('articleIds' in category) {
				safeToDelete = true;
			}
		});

		if (safeToDelete && (totalAmountOfArticles == 0)) {
			Topics.remove({
				_id: topicId
			});
		}
		
	}
	
});