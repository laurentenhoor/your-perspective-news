import { Articles } from '/imports/api/articles';

import hotness from '/imports/api/helpers/hotness'

export default class ArticlesApi {

    constructor($topicsApi) {
        'ngInject';
        this.$topicsApi = $topicsApi;
    }

    getByTopicId(topicId) {
        let topic = this.$topicsApi.getById(topicId)
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

    updateArticle(article) {
        Articles.update({ _id: article._id }, article);
    }

    addToNewTopic(article) {
        var topicId = this.$topicsApi.newTopic();
        this.addToTopic(topicId, article);
    }

    addToTopic(topicId, article) {
        Articles.insert(article, (error, articleId) => {
            console.log('article inserted ', articleId)
            if (error) {
                console.error(error);
            }
            this.$topicsApi.addArticle(topicId, articleId)
        });

    }
    
    vote(articleId, voteValue) {

        let article = Articles.findOne({ _id: articleId });

        let newScore = (article.stats.score + voteValue) || 0;
        
        let options = {
            $inc: {
                'stats.score': voteValue,
                'stats.totalVotes' : 1,
                'stats.upVotes' : voteValue > 0 ? 1 : voteValue == -2 ? -1 : 0,
                'stats.downVotes' : voteValue < 0 ? 1 : voteValue == 2 ? -1 : 0,
            },
            $set : {
                'stats.hotness': hotness(newScore, article.createdAt)
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