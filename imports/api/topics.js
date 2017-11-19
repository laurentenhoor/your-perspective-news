import { Mongo } from 'meteor/mongo';

export const Topics = new Mongo.Collection('topics');

Topics.before.insert(function (userId, doc) {

	if(Meteor.isServer) {
		//Format the document
		doc.createdAt = Date.now();
		doc.updatedAt = Date.now();
	}
});

if(Meteor.isServer) {
    Meteor.publish('topics', function(){
        return Topics.find({});
    });
    
}

if(Meteor.isClient) {
	Meteor.subscribe('topics');
}