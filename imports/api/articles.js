import { Mongo } from 'meteor/mongo';

export const Articles = new Mongo.Collection('articles');

Articles.before.insert(function (userId, doc) {

	if(Meteor.isServer) {
		//Format the document
		doc.createdAt = Date.now();
		doc.updatedAt = Date.now();
	}
});

// if(Meteor.isServer) {
//     Meteor.publish('articles', function(){
//         return Articles.find({});
//     });
// }

// if(Meteor.isClient) {
	// Meteor.subscribe('articles');
// }