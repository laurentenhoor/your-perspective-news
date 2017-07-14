import { Mongo } from 'meteor/mongo';

export const Chat = new Mongo.Collection('chat');

Chat.before.insert(function (userId, doc) {

	if(Meteor.isServer) {
		//Format the document
		doc.createdAt = Date.now();
		doc.updatedAt = Date.now();
	}
});