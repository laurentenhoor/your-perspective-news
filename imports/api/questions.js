import { Mongo } from 'meteor/mongo';

export const Questions = new Mongo.Collection('questions');


Questions.before.insert(function (userId, doc) {

	if (Meteor.isServer) {
		//Format the document
		let currentDate = Date.now();

		doc.createdAt = currentDate;
		doc.updatedAt = currentDate;

		doc.stats = {
			createdAt: currentDate,
			hotness: hotness(0, currentDate)
		};

	}
});

if(Meteor.isServer) {
    Meteor.publish('questions', function(){
        return Questions.find();
    });
}

if(Meteor.isClient) {
	Meteor.subscribe('questions');
}