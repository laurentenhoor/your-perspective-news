import { Topics } from '../../imports/api/topics.js';

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
 

  Meteor.startup(function () {
    // code to run on server at startup
    Migrations.migrateTo(2);
  });
}