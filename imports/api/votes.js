import { Mongo } from 'meteor/mongo';

export const Votes = new Mongo.Collection('votes');

Votes.before.insert(function (userId, doc) {

	if(Meteor.isServer) {
		//Format the document
		doc.createdAt = Date.now();
		doc.updatedAt = Date.now();
	}
});

if(Meteor.isServer) {
    Meteor.publish('votes', function(){
        return Votes.find({ownerId: Meteor.userId()});
    });
}

if(Meteor.isClient) {
    Meteor.subscribe('votes');      
}