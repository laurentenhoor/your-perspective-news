import { Mongo } from 'meteor/mongo';

export const Posts = new Mongo.Collection('bundles');

Bundles.before.insert(function (userId, doc) {

	if(Meteor.isServer) {
		//Format the document
		doc.createdAt = Date.now();
		doc.updatedAt = Date.now();
	}
});

if(Meteor.isServer) {
    Meteor.publish('bundles', function(){
        return Bundles.find({});
    });
}

if(Meteor.isClient) {
	Meteor.subscribe('bundles');
}