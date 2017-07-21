import { Mongo } from 'meteor/mongo';

export const Feedback = new Mongo.Collection('feedback');

Feedback.before.insert(function (userId, doc) {

	if(Meteor.isServer) {
		//Format the document
		doc.createdAt = Date.now();
		doc.updatedAt = Date.now();
	}
});