import { Topics } from '../../imports/api/topics.js';
import { Articles } from '../../imports/api/articles.js';

Meteor.methods({
	
	removeArticle(topicId, articleId) {
		
		console.log(topicId);
		console.log(articleId);
		
		Topics.update({
			_id: topicId,
			'articlesByCategory.articles._id' : articleId
			}, {$pull: {'articlesByCategory.$.articles': {'_id': articleId}}
		});
		
		var topic = Topics.find({id: topicId,
				'articlesByCategory.articles._id' : articleId})
				
		console.log(topic.count())
		
	}
});


