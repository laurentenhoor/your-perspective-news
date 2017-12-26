import angular from 'angular';
import angularMeteor from 'angular-meteor';


class CommentsTreeBuilder {

	constructor() {

	}

	getCommentsTree(unsortedComments) {

		var rootComments = findRootCommentsAndSortByVotes(unsortedComments);
		var childrenPerComment = findAllChildrenPerComment(unsortedComments);

		var commentsTree = buildCommentsTree(rootComments, childrenPerComment);

		return commentsTree;

	}
}

function findRootCommentsAndSortByVotes(unsortedComments) {

	var rootComments = [];
	// find the top level nodes and hash the childrenPerComment based on parent
	for (var i = 0, amountOfComments = unsortedComments.length; i < amountOfComments; ++i) {

		var selectedComment = unsortedComments[i];

		if (!selectedComment.parentCommentId) {
			rootComments.push(selectedComment);

		} 

	}

	rootComments = sortCommentsArrayByVotes(rootComments);

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

	for (var i = 0, amountOfComments = rootComments.length; i < amountOfComments; ++i) {
		recursivelyAddChildrenToSelectedRootComment(commentsTree[i], childrenPerComment);
	}

	return commentsTree;

}


function recursivelyAddChildrenToSelectedRootComment(selectedRootComment, childrenPerComment) {

	if (childrenPerComment[selectedRootComment._id]) {

		selectedRootComment.children = childrenPerComment[selectedRootComment._id];
		selectedRootComment.children = sortCommentsArrayByVotes(selectedRootComment.children);

		for (var i = 0, amountOfComments = selectedRootComment.children.length; i < amountOfComments; ++i) {
			recursivelyAddChildrenToSelectedRootComment(selectedRootComment.children[i], childrenPerComment);
		}

	}
}


function sortCommentsArrayByVotes(commentsArray) {

	// sort root by voting score
	commentsArray.sort(function(a,b) {
		return b.score - a.score;
	});

	return commentsArray;

}

var name = "CommentsTreeBuilder";

export default angular.module(name, [
	angularMeteor
	]).service(name, CommentsTreeBuilder);