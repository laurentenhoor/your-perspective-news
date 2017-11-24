import { Votes } from '../../imports/api/votes.js';
import { Posts } from '../../imports/api/posts.js';
import { Topics } from '../../imports/api/topics.js';

import { Comments } from '../../imports/api/comments.js';

Meteor.methods({

	voteById(id, voteValue) {
		
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-logged-in', "Please login first");
		}
		
		// robustness for adjusting the javascript value
		if (voteValue > 0) {
			voteValue = 1;
		} else {
			voteValue = -1;
		}

		// check if a vote already exists for this user and article
		var vote = Votes.findOne({articleId : id, ownerId: Meteor.userId()});
		console.log(vote);
		
		
		if (!vote) {
			
			Votes.insert({
				ownerId: Meteor.userId(),
				ownerName: Meteor.user().username,
//				email: Meteor.user() ? Meteor.user().emails[0].address : 'null',
				value: voteValue,
				articleId : id
			});
			
			Posts.update(id, {$inc : { score: voteValue}});
			Comments.update(id, {$inc : {score: voteValue}});
			
			Topics.upsert({
				'articlesByCategory.articles._id' : id
			}, {$inc : {score: 2*voteValue}});
			
			
		} else {
			
			if (vote.value != voteValue) {
				
				Votes.update(vote._id, {$set: {value: voteValue}});
				
				Posts.update(id, {$inc : {score: 2*voteValue}});
				Comments.update(id, {$inc : {score: 2*voteValue}});
				
				Topics.upsert({
					'articlesByCategory.articles._id' : id
				}, {$inc : {'articlesByCategory.$.articles.score': 2*voteValue}}, function( error, result) { 
				    if ( error ) console.log ( error ); //info about what went wrong
				    if ( result ) console.log ( result ); //the _id of new object if successful
				  });
				
			}
			
		}
		
	}
});