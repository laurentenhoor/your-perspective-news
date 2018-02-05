import { Articles } from '/imports/api/articles';

import hotness from '/imports/api/helpers/hotness'

export default class ArticlesApi {

    constructor($topicsApi) {
        'ngInject';
        this.$topicsApi = $topicsApi;
    }

    getByTopicId(topicId) {
        let topic = this.$topicsApi.getById(topicId)
        if (topic) {
            return this.getByTopic(topic);
        }
        return null;
    }

    getByTopic(topic) {
        var articles = Articles.find({
            _id: { "$in": topic.articleIds }
        }).fetch();
        return articles;
    }

    getByIds(idArray) {
        return Articles.find({ "_id": { "$in": idArray } }).fetch();
    }

    getRootArticles(topic) {
        if (!topic) {
            return;
        }
        var articles = Articles.find({
            _id: { $in: topic.articleIds },
            category: 'Nieuws',
        }, {
            sort : {'stats.hotness': -1}
        }).fetch();
        return articles;
    }

    getOtherArticles(topic) {
        var articles = Articles.find({
            _id: { $in: topic.articleIds, },
            category: { $ne: 'Nieuws' }
        }, {
            sort : {'stats.hotness': -1}
        }).fetch();
        return articles;
    }

    getHotness(articleId) {
        let article = Articles.findOne({ _id: articleId });
        if (article && article.stats && article.stats.hotness) {
            return article.stats.hotness
        }
        return null;
    }

    updateArticle(article) {
        Articles.update({ _id: article._id }, article);
        this.$topicsApi.fireCallbacks(this.$topicsApi.callbacks.addedArticle)
    }

    createArticle(article, callback) {
        Articles.insert(article, (error, articleId) => {
            console.log('article inserted ', articleId)
            if (error) {
                console.error(error);
            }
            callback(articleId)
        });
    }

    addToNewTopic(article) {
        this.createArticle(article, (articleId) => {
            this.$topicsApi.addArticleToNewTopic(articleId);
        })
    }

    addToTopic(topicId, article) {
        this.createArticle(article, (articleId) => {
            this.$topicsApi.addArticle(topicId, articleId)
        })
    }

    vote(topicId, articleId, voteValue) {

        let article = Articles.findOne({ _id: articleId });

        let newScore = (article.stats.score + voteValue) || 0;

        let options = {
            $inc: {
                'stats.score': voteValue,
                'stats.totalVotes': 1,
                'stats.upVotes': voteValue > 0 ? 1 : voteValue == -2 ? -1 : 0,
                'stats.downVotes': voteValue < 0 ? 1 : voteValue == 2 ? -1 : 0,
            },
            $set: {
                'stats.hotness': hotness(newScore, article.createdAt)
            }
        }

        Articles.update(articleId, options, (error) => {
            if (error) {
                console.error(error)
            }
            this.$topicsApi.vote(topicId, voteValue)
        })

        ga('send', {
            hitType: 'event',
            eventCategory: 'Vote',
            eventAction: 'Article',
            eventLabel: '/article/'+articleId,
            eventValue: voteValue
        })

    }

    countVisitExternal(articleId) {
        Articles.update({ _id: articleId }, {
            $inc:
                { 'stats.externalVisits': 1 }
        });
        ga('send', {
            hitType: 'event',
            eventCategory: 'Read',
            eventAction : 'External article',
            eventLabel : '/article/'+articleId
        })
    }

    countShowDetails(articleId) {
        Articles.update({ _id: articleId }, {
            $inc:
                { 'stats.detailsShown': 1 }
        });
    }

}