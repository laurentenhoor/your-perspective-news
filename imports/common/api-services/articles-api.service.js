import { Articles } from '/imports/api/articles';
import { Topics } from '/imports/api/topics';

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
        Articles.update({_id: article._id}, article);
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

}