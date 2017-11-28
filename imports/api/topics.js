import { Mongo } from 'meteor/mongo';

export const Topics = new Mongo.Collection('topics');

import { Articles } from './articles.js';

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
    
    Meteor.publish("topicsAndArticles", function () {
    	  return [
//    	    Topics.find({}, {limit: 6, sort: {'createdAt':-1}}),
    	    Topics.find({}),
    	    Articles.find({}),
    	  ];
    	});   
}

if(Meteor.isClient) {
	Meteor.subscribe('topics');
}