import { Articles } from '/imports/api/articles';
import { Topics } from '/imports/api/topics';

import hotness from '/imports/api/helpers/hotness'

export default class ArticlesApi {

    constructor() {
        'ngInject';
    }

    getByTopicId(topicId) {
        let topic = Topics.findOne({ _id: topicId });
        return this.getByTopic(topic);
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

    removeFromTopic(topicId, articleId) {
        Topics.update({
            _id: topicId
        }, {
                $pull: { articleIds: articleId }
            });
    }

    updateArticle(article) {
        Articles.update({ _id: article._id }, article);
    }

    addToNewTopic(article) {
        var topicId = Topics.insert({});
        this.addToTopic(topicId, article);
    }

    addToTopic(topicId, article) {
        Articles.insert(article, (error, articleId) => {
            console.log('article inserted ', articleId)

            if (error) {
                console.error(error);
            }

            Topics.update({
                _id: topicId
            }, {
                    $push: { articleIds: articleId }
                });

        });

    }

    updateHotness(articleId) {
        let article = Articles.findOne({ _id: articleId });

        if (!article || !article.stats || !article.stats.score || !article.createdAt) {
            return console.error('Article has not the right fields for the hotness calculation')
        }

        Articles.update(articleId, {
            $set: {'stats.hotness': hotness(article.stats.score, article.createdAt)}
        }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    }

    updateScore(articleId, scoreDifference) {
        Articles.update(articleId, { $inc: { 'stats.score': scoreDifference } },
            (error) => {
                if (error) {
                    console.error(error);
                    return
                }
                this.updateHotness(articleId)
            })
    }

    countVisitExternal(articleId) {
        Articles.update({ _id: articleId }, {
            $inc:
                { 'stats.externalVisits': 1 }
        });
    }

    countShowDetails(articleId) {
        Articles.update({ _id: articleId }, {
            $inc:
                { 'stats.detailsShown': 1 }
        });
    }

    countTotalVotes(articleId) {
        Articles.update({ _id: articleId }, {
            $inc:
                { 'stats.totalVotes': 1 }
        });
    }

    countUpVote(articleId, value) {
        Articles.update({ _id: articleId }, {
            $inc:
                { 'stats.upVotes': value }
        });
    }

    countDownVote(articleId, value) {
        Articles.update({ _id: articleId }, {
            $inc:
                { 'stats.downVotes': value }
        });
    }



}