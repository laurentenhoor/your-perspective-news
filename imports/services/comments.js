import angular from 'angular';
import angularMeteor from 'angular-meteor';

class CommentSortingService {
	
  constructor() {
    
  }
    
  buildCommentHierarchy(unsortedComments) {
	  
	    var topLevelComments = findTopLevelComments(unsortedComments);
	    var repliesPerCommentId = findRepliesPerCommentId(unsortedComments);

	    // enumerate through to handle the case where there are multiple topLevelComments
	    for (var i = 0, amountOfComments = topLevelComments.length; i < amountOfComments; ++i) {
	    		recursivelyAddRepliesToSelectedTopLevelComment(topLevelComments[i], repliesPerCommentId);
	    }

	    // sort root by voting score
	    topLevelComments.sort(function(a,b) {
	    		return b.score - a.score;
	    })
	    
	    return topLevelComments;
	}
}



function findTopLevelComments(unsortedComments) {

	  	var topLevelComments = [];
	    // find the top level nodes and hash the repliesPerCommentId based on parent
	    for (var i = 0, amountOfComments = unsortedComments.length; i < amountOfComments; ++i) {
	    	
	    	var selectedComment = unsortedComments[i];
	    	 
	      	if (!unsortedComments[i].parentCommentId) {
	      		topLevelComments.push(selectedComment);
	      		
	      	} 

	    }
	    return topLevelComments;
}


function findRepliesPerCommentId(unsortedComments) {
	  
	  	var repliesPerCommentId = {};
	  	
	    // find the top level nodes and hash the repliesPerCommentId based on parent
	    for (var i = 0, amountOfComments = unsortedComments.length; i < amountOfComments; ++i) {
	    	
	    	var selectedComment = unsortedComments[i];
	    	
	      	if (unsortedComments[i].parentCommentId) {
	      		
	      		if (!repliesPerCommentId[selectedComment.parentCommentId]) {
      			repliesPerCommentId[selectedComment.parentCommentId] = [];	
      		}
      		repliesPerCommentId[selectedComment.parentCommentId].push(selectedComment);
	      		
	      	} 

	    }
	    return repliesPerCommentId;
	  
}


//function to recursively build the tree
function recursivelyAddRepliesToSelectedTopLevelComment(selectedTopLevelComment, repliesPerCommentId) {
 
	if (repliesPerCommentId[selectedTopLevelComment._id]) {
 	
 	// add repliesPerCommentId to selectedTopLevelComment and sort by voting score
     selectedTopLevelComment.children = repliesPerCommentId[selectedTopLevelComment._id].sort(function(a, b){
     		return (b.score - a.score);
     });
     
     for (var i = 0, amountOfComments = selectedTopLevelComment.children.length; i < amountOfComments; ++i) {
    	 	recursivelyAddRepliesToSelectedTopLevelComment(selectedTopLevelComment.children[i], repliesPerCommentId);
     }
     
 }
};

// create a module
export default angular.module('yourpers.selectedCommentSortingService', [
    angularMeteor
])

.service("CommentSortingService", CommentSortingService);