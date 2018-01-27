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

    newTopic() {
        return Topics.insert({});
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