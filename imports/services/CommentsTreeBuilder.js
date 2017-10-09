import angular from 'angular';
import angularMeteor from 'angular-meteor';

class CommentsTreeBuilder {

	constructor() {

	}

	getCommentsTree(unsortedComments) {

		var rootComments = findRootComments(unsortedComments);
		var childrenPerComment = findAllChildrenPerComment(unsortedComments);

		var commentsTree = buildCommentsTree(rootComments, childrenPerComment);
		
		var sortedCommentsTree = sortCommentsTreeByVotes(commentsTree);
		
		return sortedCommentsTree;
		
	}
}


function findRootComments(unsortedComments) {

	var rootComments = [];
	// find the top level nodes and hash the childrenPerComment based on parent
	for (var i = 0, amountOfComments = unsortedComments.length; i < amountOfComments; ++i) {

		var selectedComment = unsortedComments[i];

		if (!selectedComment.parentCommentId) {
			rootComments.push(selectedComment);

		} 

	}
	return rootComments;
}


function findAllChildrenPerComment(unsortedComments) {

	var childrenPerComment = {};

	// find the top level nodes and hash the childrenPerComment based on parent
	for (var i = 0, amountOfComments = unsortedComments.length; i < amountOfComments; ++i) {

		var selectedComment = unsortedComments[i];

		if (selectedComment.parentCommentId) {

			if (!childrenPerComment[selectedComment.parentCommentId]) {
				childrenPerComment[selectedComment.parentCommentId] = [];	
			}
			childrenPerComment[selectedComment.parentCommentId].push(selectedComment);

		} 

	}
	return childrenPerComment;

}


function buildCommentsTree(rootComments, childrenPerComment) {

	var commentsTree = rootComments;

	// enumerate through to handle the case where there are multiple rootComments
	for (var i = 0, amountOfComments = rootComments.length; i < amountOfComments; ++i) {
		recursivelyAddChildrenToSelectedRootComment(commentsTree[i], childrenPerComment);
	}

	return commentsTree;

}


//function to recursively build the tree
function recursivelyAddChildrenToSelectedRootComment(selectedRootComment, childrenPerComment) {

	if (childrenPerComment[selectedRootComment._id]) {

		// add childrenPerComment to selectedRootComment and sort by voting score
		selectedRootComment.children = sortCommentsTreeByVotes(childrenPerComment[selectedRootComment._id]);

		for (var i = 0, amountOfComments = selectedRootComment.children.length; i < amountOfComments; ++i) {
			recursivelyAddChildrenToSelectedRootComment(selectedRootComment.children[i], childrenPerComment);
		}

	}
}


function sortCommentsTreeByVotes(commentsTree) {
	
	// sort root by voting score
	commentsTree.sort(function(a,b) {
		return b.score - a.score;
	})
	
	return commentsTree;
	
}


//create a module
export default angular.module('yourpers.CommentsTreeBuilder', [
	angularMeteor
	])
	.service('CommentsTreeBuilder', CommentsTreeBuilder);