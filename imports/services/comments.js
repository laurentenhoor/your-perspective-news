import angular from 'angular';
import angularMeteor from 'angular-meteor';

class CommentSortingService {
	
  constructor() {
    
  }
    
  buildCommentHierarchy(unsortedComments) {
	  
	    var topLevelComments = findTopLevelComments(unsortedComments);
	    var responsesPerCommentId = findResponsesPerCommentId(unsortedComments);


	    // function to recursively build the tree
	    var addResponsesToSelectedComment = function(selectedComment) {
	        
	    	if (responsesPerCommentId[selectedComment._id]) {
	        	
	        	// add responsesPerCommentId to selectedComment and sort by voting score
	            selectedComment.children = responsesPerCommentId[selectedComment._id].sort(function(a, b){
	            		return (b.score - a.score);
	            });
	            
	            for (var i = 0, amountOfComments = selectedComment.children.length; i < amountOfComments; ++i) {
	                addResponsesToSelectedComment(selectedComment.children[i]);
	            }
	            
	        }
	    };

	    // enumerate through to handle the case where there are multiple topLevelComments
	    for (var i = 0, amountOfComments = topLevelComments.length; i < amountOfComments; ++i) {
	        addResponsesToSelectedComment(topLevelComments[i]);
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
	    // find the top level nodes and hash the responsesPerCommentId based on parent
	    for (var i = 0, amountOfComments = unsortedComments.length; i < amountOfComments; ++i) {
	    	
	    	var selectedComment = unsortedComments[i];
	    	 
	      	if (!unsortedComments[i].parentCommentId) {
	      		topLevelComments.push(selectedComment);
	      		
	      	} 

	    }
	    return topLevelComments;
}

function findResponsesPerCommentId(unsortedComments) {
	  
	  	var responsesPerCommentId = {};
	    // find the top level nodes and hash the responsesPerCommentId based on parent
	    for (var i = 0, amountOfComments = unsortedComments.length; i < amountOfComments; ++i) {
	    	
	    	var selectedComment = unsortedComments[i];
	    	
	      	if (unsortedComments[i].parentCommentId) {
	      		
	      		if (!responsesPerCommentId[selectedComment.parentCommentId]) {
      			responsesPerCommentId[selectedComment.parentCommentId] = [];	
      		}
      		responsesPerCommentId[selectedComment.parentCommentId].push(selectedComment);
	      		
	      	} 

	    }
	    return responsesPerCommentId;
	  
}

// create a module
export default angular.module('yourpers.selectedCommentSortingService', [
    angularMeteor
])

.service("CommentSortingService", CommentSortingService);