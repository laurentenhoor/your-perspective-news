import { Topics } from '/imports/api/topics';

export default class TopicsApiService {

    constructor() {
        'ngInject';
    }

    getAll() {
        return Topics.find({}).fetch();
    }

    getById(topicId) {
        return Topics.findOne({ _id: topicId });
    }

    getOwnedByCurrentUser() {
        let topics = Topics.find({ownerId: Meteor.userId()}, { fields: { stats: 0 }, sort:{ createdAt: -1}}).fetch()
        if (topics.length > 0) {
            return topics[0]._id;
        }
        return null;
    }

    createTopic() {
        return Topics.insert({ownerId: Meteor.userId()});
    }

    removeArticle(topicId, articleId) {
        Topics.update({
            _id: topicId
        }, {
                $pull: { articleIds: articleId }
            });
        
        var topic = this.getById(topicId);
        if (topic.articleIds.length == 0) {
            console.log('topic removed because last article has been deleted', topicId)
            Topics.remove(topicId)
        }
        
    }

    addArticle(topicId, articleId) {
        Topics.update({
            _id: topicId
        }, {
                $push:
                    { articleIds: articleId },
                $inc:
                    { 'stats.articleCount': 1 }
            });
    }

    countOpen(topicId) {
        console.log('count open of topic', topicId)
        Topics.update({ _id: topicId }, {
            $inc:
                { 'stats.openCount': 1 }
        })
    }

}