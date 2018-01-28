import { Topics } from '/imports/api/topics';

export default class TopicsApiService {

    constructor() {
        'ngInject';
        this.callbacks = {
            createdTopic: [],
            removedTopic: [],
            addedArticle: [],
            removedArticle: []
        }
    }

    fireCallbacks(arrayOfFunctions, returnValue) {
        if (arrayOfFunctions) {
            _.each(arrayOfFunctions, (callback) => callback(returnValue))
        } else {
            console.warn('no callbacks set', arrayOfFunctions)
        }

    }

    setCallbacks(callbacks) {
        if (callbacks.createdTopic) {
            this.callbacks.createdTopic.push(callbacks.createdTopic);
        }
        if (callbacks.removedTopic) {
            this.callbacks.removedTopic.push(callbacks.removedTopic);
        }
        if (callbacks.addedArticle) {
            this.callbacks.addedArticle.push(callbacks.addedArticle);
        }
        if (callbacks.removedArticle) {
            this.callbacks.removedArticle.push(callbacks.removedArticle);
        }
    }

    getAll() {
        return Topics.find({}).fetch();
    }

    getById(topicId) {
        return Topics.findOne({ _id: topicId });
    }

    getOwnedByCurrentUser() {
        let topics = Topics.find({ ownerId: Meteor.userId() }, { fields: { stats: 0 }, sort: { createdAt: -1 } }).fetch()
        if (topics.length > 0) {
            return topics[0]._id;
        }
        return null;
    }

    createTopic() {
        return Topics.insert({ ownerId: Meteor.userId() });
    }

    removeArticle(topicId, articleId) {

        Topics.update({ _id: topicId },
            { $pull: { articleIds: articleId } },
            (error) => {
                if (error) {
                    console.error(error);
                    return;
                }
                this.fireCallbacks(this.callbacks.removedArticle, articleId)

                var topic = this.getById(topicId);
                if (topic.articleIds.length == 0) {
                    console.log('topic removed because last article has been deleted', topicId)
                    Topics.remove(topicId, () => {
                        this.fireCallbacks(this.callbacks.removedTopic, topicId)
                    });
                }
            });

    }

    addArticleToNewTopic(articleId) {

        let topicId = this.createTopic();

        this.addArticle(topicId, articleId, () => {

            this.fireCallbacks(this.callbacks.createdTopic, topicId)

        })
    }

    addArticle(topicId, articleId, callback) {
        Topics.update({ _id: topicId }, {
            $push: { articleIds: articleId },
            $inc: { 'stats.articleCount': 1 }
        }, (error) => {
            if (error) {
                console.error(error);
                return;
            }
            this.fireCallbacks(this.callbacks.addedArticle, articleId)

            if (callback) {
                callback();
            }

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