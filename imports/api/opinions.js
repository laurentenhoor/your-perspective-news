import { Mongo } from 'meteor/mongo';

export const Opinions = new Mongo.Collection('opinions');

if(Meteor.isServer) {
    Meteor.publish('opinions', function(){
        return Opinions.find();
    });
}

if(Meteor.isClient) {
	Meteor.subscribe('opinions');
}