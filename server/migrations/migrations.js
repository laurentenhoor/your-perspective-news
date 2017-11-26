import { Topics } from '../../imports/api/topics.js';
import { Articles } from '../../imports/api/articles.js';

import { Random } from 'meteor/random'

if (Meteor.isServer) {
  Migrations.add({
    version: 1,
    name: 'Initial database',
    up: function() {console.log('Inside migrations');}
  });
 
  
  Migrations.add({
	    version: 2,
	    name: 'add articleIds array to topics',
	    up: function() {

	    	_.forEach(Topics.find({}).fetch(), function(topic){
	    		
	    		_.forEach(topic.articlesByCategory, function(category, i) {

	    			if ('articleIds' in category) {
	    				console.log('this is a modern schema')
	    				return;
	    			}

	    			var articleIds = [];		
	    			_.forEach(category.articles, function(article) {			
	    				articleIds.push(article._id);
	    			})
	    			topic.articlesByCategory[i].articleIds = articleIds;
	    			
	    		});
	    		//update full scheme
	    		Topics.update({_id:topic._id}, topic);
	    		
	    	});
		
	    }
	  });
 
  
  Migrations.add({
	    version: 3,
	    name: 'Add 0 score to existing articles',
	    up: function() {

	    	_.forEach(Articles.find({}).fetch(), function(article){
	    		if (!('score' in article)) {
	    			article.score = 0;
	    			Articles.update({_id: article._id}, article);
	    			console.log('score updated')
	    		} else {
	    			console.log('score detected')
	    			
	    		}

	    	})	    
		
	    }
	  });
  
  
  Migrations.add({
	    version: 4,
	    name: 'Add _id to all existing categories',
	    up: function() {

	    	_.forEach(Topics.find({}).fetch(), function(topic){
	    		
	    		_.forEach(topic.articlesByCategory, function(category, i) {
	    			
	    			category._id = Random.id();
	    			
	    		})
	    		
	    		Topics.update({_id:topic._id}, topic);
	    		
	    	})
		
	    }
	  });


  Meteor.startup(function () {
    // code to run on server at startup
    Migrations.migrateTo('latest');
  });
}