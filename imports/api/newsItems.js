import { Mongo } from 'meteor/mongo';

export const NewsItems = new Mongo.Collection('newsItems');

NewsItems.before.insert(function (userId, doc) {

	if(Meteor.isServer) {
		//Format the document
		doc.createdAt = Date.now();
		doc.updatedAt = Date.now();
	}
});

if(Meteor.isServer) {
    Meteor.publish('newsItems', function(){
        return NewsItems.find({});
    });
    
    
    
    
}

if(Meteor.isClient) {
	Meteor.subscribe('newsItems');
}