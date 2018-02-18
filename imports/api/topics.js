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

		var articleIds = [];

		if (!topics) {
			return true;
		}

		_.each(topics, (topic) => {
			articleIds = articleIds.concat(topic.articleIds);
		});

		if (articleIds.length > 0) {
			return Articles.find({
				_id: { $in: articleIds }
			});
		}
		return true;
		
	});

}