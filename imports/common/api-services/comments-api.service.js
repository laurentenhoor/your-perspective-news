import { Comments } from '/imports/api/comments';

export default class CommentsApiService {

    constructor($commentsTree) {
        'ngInject';
        this.$commentsTree = $commentsTree;
    }

    getBestCommentByTopic(topic) {
        return this.$commentsTree.getSortedRoots(this.getAllByTopic(topic))[0];
    }

    getAllByTopic(topic) {
        if (topic) {
            return this.getAllByTopicId(topic._id);
        }
        return null;
    }

    getAllByTopicId(topicId) {
        
        let comments = Comments.find({
            parentItemId: topicId
        }).fetch();
        
        // console.log('Comments', comments);
        
        return comments;
    }

}