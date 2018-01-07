import { Mongo } from 'meteor/mongo';

export const Opinions = new Mongo.Collection('opinions');

Opinions.before.insert(function (userId, doc) {

	if(Meteor.isServer) {
		//Format the document
		doc.createdAt = Date.now();
		doc.updatedAt = Date.now();
	}
});

if(Meteor.isServer) {
    Meteor.publish('opinions', function(){
        return Opinions.find({});
    });
}

if(Meteor.isClient) {
	Meteor.subscribe('opinions');
}