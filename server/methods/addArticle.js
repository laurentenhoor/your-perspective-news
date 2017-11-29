import { Topics } from '../../imports/api/topics.js';
import { Articles } from '../../imports/api/articles.js';

import { Random } from 'meteor/random';

Meteor.methods({
	
	addArticle(topicId, category, article) {
		
		console.log('back-end method addArticleId() called')
		console.log(topicId);
		console.log(category);
		console.log(article);
			
		var articleId = Articles.insert(article);
		article._id = articleId;
		article.score = 0;
		article.createdAt = Date.now();
		article.updatedAt = Date.now();
		
		if (!topicId) {
			topicId = createTopic(category, article)
			console.log('new topic created with id: ' + topicId);
		} else if (!topicExists(topicId)) {
			console.error('topicId does not exist in database');
		} else {
			addArticleToTopic(topicId, category, article)
			console.log('new article added to topic: ' + topicId);
		}
		
	},
	
	addArticleToCategory(topicId, category, article) {
		addArticleToTopic(topicId, category, article);
	}
	
	
});

function createTopic(category, article) {
	
	topicId = Topics.insert({});
	createCategoryAndAddArticle(topicId, category, article)
	
	return topicId;
	
};


function addArticleToTopic(topicId, category, article) {

	console.log('category exists? ' + categoryExists(topicId, category))
	console.log(category);
	
	if (categoryExists(topicId, category)) {
		addArticleToExistingCategory(topicId, category, article);
	} else {
		createCategoryAndAddArticle(topicId, category, article);
	}
	
};

function topicExists(topicId) {
	
	topic = Topics.find({
		_id : topicId
	})
	
	return topic.count()>0;
}


function categoryExists(topicId, category) {
	
	topic = Topics.find({
		_id : topicId,
		'articlesByCategory.category': category,
	})
	
	return topic.count()>0;
}


function createCategoryAndAddArticle(topicId, category, article) {

	// hard coded priorities
	switch (category) {
		case 'Algemene berichtgeving':
			sortingOrder = 1;	
			break;
		case 'Andere kijk':
			sortingOrder = 2;
			break;
		case 'Entertainment':
			sortingOrder = 3;
			break;
		default:
			sortingOrder = 4;
			break;
			
	}
	
	console.log({
			_id : Random.id(),
			category: category, 
			articleIds: [article._id], 
			sortingOrder : sortingOrder
		})
	
	
	Topics.update({
		_id : topicId
	},{ 
		$push: { "articlesByCategory": {
			_id : Random.id(),
			category: category, 
			articleIds: [article._id], 
			sortingOrder : sortingOrder
		}}
	}, function(error) {
		console.log(error);
	});
	
}



function addArticleToExistingCategory(topicId, category, article) {
	
	Topics.update({
		_id : topicId,
		'articlesByCategory.category': category
	},{ 
		$push: { "articlesByCategory.$.articleIds": article._id}
	}, function(error) {
		console.log(error);
	});
}
