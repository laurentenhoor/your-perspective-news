import { Topics } from '../../imports/api/topics.js';
import { Articles } from '../../imports/api/articles.js';

Meteor.methods({
	
	removeArticleFromCategory(topicId, categoryName, articleId) {
		
		console.log('removeArticle')
		console.log('topicId: ' + topicId);
		console.log('articleId: ' + articleId);
		console.log('categoryName: ' + categoryName);
		
		Topics.update({
			_id: topicId,
			'articlesByCategory.articleIds' : articleId,
			'articlesByCategory.category' : categoryName,
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