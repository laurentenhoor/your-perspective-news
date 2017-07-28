import { Mongo } from 'meteor/mongo';

export const Posts = new Mongo.Collection('posts');

Posts.before.insert(function (userId, doc) {

	if(Meteor.isServer) {
		//Format the document
		doc.createdAt = Date.now();
		doc.updatedAt = Date.now();
	}
});

if(Meteor.isServer) {
    Meteor.publish('posts', function(){
        return Posts.find({});
    });
}