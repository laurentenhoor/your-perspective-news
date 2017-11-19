import { Topics } from '../../imports/api/topics.js';
import { Articles } from '../../imports/api/articles.js';

import { Random } from 'meteor/random';

Meteor.methods({
	
	upsertArticle(topicId, category, article) {
		
		article._id = Random.id();

		//TODO: add validation of article
		var articleId = Articles.insert(article);
		
		if (!topicId || !topicExists(topicId)) {
			createTopic()
		} else {
			addArticleToNewsItem()
		}
		
	}
});

Meteor.call('upsertArticle', 'L2MCBj2YyfWD4orXm', 'Algemene berichtgeving', {testTitle:'testTitle'});

function createTopic(category, article) {
	
	Topics.insert({
		articlesByCategory: [{
			category : category,
			articles : [article]
		}]
		
	});
	
};

function addArticleToNewsItem(topicId, category, article) {
	
	addArticleToTopic(topicId, category, article);
	
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

function updateNewsItem(topicId, category, articleId) {
	
	topic = Topics.findOne({_id : topicId});
	
	console.log(topic);
	console.log(topic.categories)
	console.log(category)
	console.log(topic.categories == category)
	
	if (topic.categories.indexOf(category) > -1) {
		console.log('category found in current topic');
//		Topics.update({_id : topicId}, {$push : });
	} else {
		console.log('category NOT found in current topic');
	}
	
};

//updateNewsItem('kPdF9c8tdnM7Waq7L', 'Algemene berichtgeving', 'kZKnhePAbt9FMgFJK');
