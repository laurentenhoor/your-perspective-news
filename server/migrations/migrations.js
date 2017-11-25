import { Topics } from '../../imports/api/topics.js';

if (Meteor.isServer) {
  Migrations.add({
    version: 1,
    name: 'its a test',
    up: function() {console.log('Inside migrations');}
  });
 
  
  Migrations.add({
	    version: 2,
	    name: 'add articleIds array to topics',
	    up: function() {
	    	
//	    	Topics.
	    	
	    	console.log('Inside migrations');}
	  });
 

  Meteor.startup(function () {
    // code to run on server at startup
    Migrations.migrateTo(1);
  });
}


topics = Topics.find({_id: 'b7zQZf4ZkRxh9rJkz'}).fetch();
console.log(topics);

_.forEach(topics, function(topic){
    //process item
//	console.log(topic);
	
	_.forEach(topic.articlesByCategory, function(category) {
		
		console.log(category._id)
		
		
	})
});
