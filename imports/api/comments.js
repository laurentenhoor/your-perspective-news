import { Mongo } from 'meteor/mongo';

export const Comments = new Mongo.Collection('comments');

Comments.before.insert(function (userId, doc) {

	if(Meteor.isServer) {
		//Format the document
		doc.createdAt = Date.now();
		doc.updatedAt = Date.now();
	}
});

if(Meteor.isServer) {
    Meteor.publish('comments', function(){
        return Comments.find({});
    });
}