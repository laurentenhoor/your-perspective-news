import { Topics } from '/imports/api/topics';

import hotness from '/imports/api/helpers/hotness'

export default class TopicsApiService {

    constructor($loader) {
        'ngInject';

        this.$loader = $loader;
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

    getWithOffset(offset) {
        return Topics.find({}, { skip: offset }).fetch();
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

    saveTitle(topicId, title) {
        Topics.update({ _id: topicId }, {
            $set: {
                title: title
            }
        }, (error) => {
            if (error) {
                console.error(error);
            }
            this.fireCallbacks(this.callbacks.addedArticle, topicId)
            console.log('Successfully stored title', title)
        });
    }

    savePublishDate(topicId, publishDate) {
        Topics.update({ _id: topicId }, {
            $set: {
                publishAt: publishDate
            }
        }, (error) => {
            if (error) {
                console.error(error);
            }
            this.fireCallbacks(this.callbacks.removedTopic, topicId)
            console.log('Successfully stored new publish date', publishDate)
        });
    }

    createTopic(topicTitle, publishDate) {
        return Topics.insert({
            ownerId: Meteor.userId(),
            title: topicTitle,
            publishAt: publishDate
        });
    }

    removeArticle(topicId, articleId) {

        this.$loader.start();

        Topics.update({ _id: topicId },
            { $pull: { articleIds: articleId } },
            (error) => {
                if (error) {
                    console.error(error);
                    return;
                }
                this.fireCallbacks(this.callbacks.removedArticle, articleId)
                this.$loader.stop();

                console.log('topicId to delete', topicId)
                var topic = this.getById(topicId);
                console.log('topic which will be deleted', topic)
                if (topic.articleIds.length == 0) {
                    console.log('topic removed because last article has been deleted', topicId)
                    Topics.remove(topicId, () => {
                        this.fireCallbacks(this.callbacks.removedTopic, topicId)
                    });
                }
            });

    }

    addArticleToNewTopic(topicTitle, publishDate, articleId) {

        let topicId = this.createTopic(topicTitle, publishDate);

        ga('send', {
            hitType: 'event',
            eventCategory: 'Post',
            eventAction: 'New topic',
            eventLabel: '/topic/' + topicId
        })

        this.addArticle(topicId, articleId, () => {

            this.fireCallbacks(this.callbacks.createdTopic, topicId)

        })
    }

    addArticle(topicId, articleId, callback) {

        this.$loader.start();
        let topic = Topics.findOne({ _id: topicId });
        let dateNow = Date.now();

        let currentScore = topic && topic.stats && topic.stats.score ? topic.stats.score : 0;

        Topics.update({ _id: topicId }, {
            $push: { articleIds: articleId },
            $inc: { 'stats.articleCount': 1 },
            $set: {
                'stats.createdAt': dateNow,
                'stats.hotness': hotness(currentScore, dateNow)
            }

        }, (error) => {
            if (error) {
                console.error(error);
                return;
            }

            ga('send', {
                hitType: 'event',
                eventCategory: 'Post',
                eventAction: 'New article',
                eventLabel: '/article/' + articleId
            })

            this.fireCallbacks(this.callbacks.addedArticle, articleId)
            this.$loader.stop();

            if (callback) {
                callback();
            }

        });
    }

    countOpen(topicId) {
        Topics.update({ _id: topicId }, {
            $inc:
                { 'stats.openCount': 1 }
        })
        ga('send', {
            hitType: 'event',
            eventCategory: 'Read',
            eventAction: 'Open topic',
            eventLabel: '/topic/' + topicId
        })
    }

    vote(topicId, voteValue) {

        let topic = Topics.findOne({ _id: topicId });
        let newScore = (topic.stats.score + voteValue) || 0;


        Topics.update({ _id: topicId }, {
            $inc: {
                'stats.score': voteValue,
                'stats.upVotes': voteValue > 0 ? 1 : voteValue == -2 ? -1 : 0,
                'stats.downVotes': voteValue < 0 ? 1 : voteValue == 2 ? -1 : 0,
            },
            $set: {
                'stats.hotness': hotness(newScore, topic.stats.createdAt)
            }
        });

    }

    getHotness(topicId) {
        let topic = Topics.findOne({ _id: topicId });
        if (topic && topic.stats && topic.stats.hotness) {
            return topic.stats.hotness
        }
        return null;
    }
}