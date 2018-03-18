import { Mongo } from 'meteor/mongo';

export const Emails = new Mongo.Collection('emails');

Emails.before.insert(function (userId, doc) {

	if(Meteor.isServer) {
		//Format the document
		doc.createdAt = Date.now();
		doc.updatedAt = Date.now();
	}
});

if(Meteor.isServer) {
    Meteor.publish('emails', function(){
        return Emails.find({});
    });
}