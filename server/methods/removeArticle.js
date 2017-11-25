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
		
		var topic = Topics.aggregate({$project: { count: { $size:"$articlesByCategory.articleIds" }}})
		console.log(topic);
		var topic = Topics.find({_id: topicId,
				'articlesByCategory.articles._id' : articleId})
				
		console.log(topic.count())
		
	}
	
});