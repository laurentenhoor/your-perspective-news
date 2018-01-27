import { Mongo } from 'meteor/mongo';

export const Articles = new Mongo.Collection('articles');

import hotness from '/imports/api/helpers/hotness';

Articles.before.insert(function (userId, doc) {

	if(Meteor.isServer) {
		//Format the document
		let currentDate = Date.now();
		doc.createdAt = currentDate;
		doc.updatedAt = currentDate;
		
		doc.stats = {
			createdAt: currentDate,
			hotness : hotness(0, currentDate)
		};
	}
});