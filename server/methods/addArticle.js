import { Topics } from '../../imports/api/topics.js';
import { Articles } from '../../imports/api/articles.js';

Meteor.methods({
	
	addArticle(topicId, category, article) {
		
		console.log('back-end method addArticleId() called')
		console.log(topicId);
		console.log(category);
		console.log(article);
		
		var articleId = Articles.insert(article);
		article._id = articleId;
		
		if (!topicId) {
			topicId = createTopic(category, article)
			console.log('new topic created with id: ' + topicId);
		} else if (!topicExists(topicId)) {
			console.error('topicId does not exist in database');
		} else {
			addArticleToTopic(topicId, category, article)
			console.log('new article added to topic: ' + topicId);
		}
		
	}
});

//Meteor.call('addArticle', 'MvzcpYhB8p42cvxAm', 'Entertainment', {testTitle:'testTitle'});
//Meteor.call('addArticle', null, 'Entertainment', {testTitle:'testTitle'});

function createTopic(category, article) {
	
	topicId = Topics.insert({
		articlesByCategory: [{
			category : category,
			articles : [article]
		}]
		
	});
	
	return topicId;
	
};


function addArticleToTopic(topicId, category, article) {

	console.log('category exists? ' + categoryExists(topicId, category))
	
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
		'articlesByCategory.category': category
	})
	
	return topic.count()>0;
}

function createCategoryAndAddArticle(topicId, category, article) {

	Topics.update({
		_id : topicId
	},{ 
		$push: { "articlesByCategory": {category: category, articles: [article]}}
	}, function(error) {
		console.log(error);
	});
	
}

function addArticleToExistingCategory(topicId, category, article) {
	
	Topics.update({
		_id : topicId,
		'articlesByCategory.category': category
	},{ 
		$push: { "articlesByCategory.$.articles": article}
	}, function(error) {
		console.log(error);
	});
}
