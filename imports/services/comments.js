import angular from 'angular';
import angularMeteor from 'angular-meteor';

class CommentSortingService {
	
  constructor() {
    
  }
  
  buildCommentHierarchy(unsortedComments) {

	    var topLevelComments = [];
	    var responsesPerCommentId = {};

	    // find the top level nodes and hash the responsesPerCommentId based on parent
	    for (var i = 0, amountOfComments = unsortedComments.length; i < amountOfComments; ++i) {
	    	
	        var selectedComment = unsortedComments[i];
//	            parentCommentId = selectedComment.parentCommentId
//	            target = !parentCommentId ? topLevelComments : (responsesPerCommentId[parentCommentId] || (responsesPerCommentId[parentCommentId] = []));
        
        	if (!selectedComment.parentCommentId) {
        		
        		topLevelComments.push(selectedComment);
        		
        	} else {
        		
        		if (!responsesPerCommentId[selectedComment.parentCommentId]) {
        			responsesPerCommentId[selectedComment.parentCommentId] = [];	
        		}
        		responsesPerCommentId[selectedComment.parentCommentId].push(selectedComment);
        		
        	}

//	        target.push(selectedComment);
	    }

	    // function to recursively build the tree
	    var findAllChildrenOfSelectedComment = function(selectedComment) {
	        if (responsesPerCommentId[selectedComment._id]) {
	        	
	        		// add responsesPerCommentId to selectedComment and sort by voting score
	            selectedComment.children = responsesPerCommentId[selectedComment._id].sort(function(a, b){
	            		return (b.score - a.score);
	            });
	            
	            for (var i = 0, amountOfComments = selectedComment.children.length; i < amountOfComments; ++i) {
	                findAllChildrenOfSelectedComment(selectedComment.children[i]);
	            }
	            
	        }
	    };

	    // enumerate through to handle the case where there are multiple topLevelComments
	    for (var i = 0, amountOfComments = topLevelComments.length; i < amountOfComments; ++i) {
	        findAllChildrenOfSelectedComment(topLevelComments[i]);
	    }

	    // sort root by voting score
	    topLevelComments.sort(function(a,b) {
	    		return b.score - a.score;
	    })
	    
	    return topLevelComments;
	}
}

// create a module
export default angular.module('yourpers.selectedCommentSortingService', [
    angularMeteor
])

.service("CommentSortingService", CommentSortingService);