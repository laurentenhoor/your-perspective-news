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
    
    vote(articleId, voteValue) {

        let article = Articles.findOne({ _id: articleId });

        let options = {
            $inc: {
                'stats.score': voteValue,
                'stats.totalVotes' : 1,
                'stats.upVotes' : voteValue > 0 ? 1 : voteValue == -2 ? -1 : 0,
                'stats.downVotes' : voteValue < 0 ? 1 : voteValue == 2 ? -1 : 0,
            },
            $set : {
                'stats.hotness': hotness(article.stats.score + voteValue, article.createdAt)
            }
        }

        Articles.update(articleId, options, (error) => {
            if (error) {
                console.error(error)
            }
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

}