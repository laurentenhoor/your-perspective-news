import { Mongo } from 'meteor/mongo';
import hotness from '/imports/api/helpers/hotness';

import { Articles } from './articles.js';

export const Topics = new Mongo.Collection('topics');

Topics.before.insert(function (userId, doc) {

	if (Meteor.isServer) {
		//Format the document
		let currentDate = Date.now();

		doc.createdAt = currentDate;
		doc.updatedAt = currentDate;

		doc.stats = {
			createdAt: currentDate,
			hotness: hotness(0, currentDate)
		};

	}
});

if (Meteor.isServer) {

	Meteor.publish('topics', (amountOfTopics, singleTopicId) => {

		console.log('subscribe to topics')
		console.log('limit', amountOfTopics)

		let searchQuery = {};

		if (singleTopicId) {
			searchQuery._id = singleTopicId;
		}

		return Topics.find(searchQuery, {
			sort: { 'stats.hotness': - 1 },
			limit: amountOfTopics
		});

	});

	Meteor.publish('articles', (topics) => {

		var articleIds = []
		
		_.each(topics, (topic) => {
			articleIds = articleIds.concat(topic.articleIds);
		});
		
		return Articles.find({
			_id: { $in: articleIds }
		});
		
	});

}