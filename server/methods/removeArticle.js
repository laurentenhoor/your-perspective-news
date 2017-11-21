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
		
		var topic = Topics.find({_id: topicId,
				'articlesByCategory.articles._id' : articleId})
				
		console.log(topic.count())
		
	}
	
	
	
});

var topicId = 'o5yaFgyad68RfF9nf';

var topic = Topics.find({_id: topicId}, {fields: {'articlesByCategory.articles': 1}}).fetch();
	
console.log('counter: ')
//console.log(topic.count())
//console.log(topic[0].articlesByCategory.articles.length)
console.log(topic[0].articlesByCategory)

