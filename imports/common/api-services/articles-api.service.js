import { Articles } from '/imports/api/articles';
import { Topics } from '/imports/api/topics';

export default class ArticlesApi {

    constructor() {
        'ngInject';
    }

    getAllByTopicId(topicId) {
        let topic = Topics.findOne({ _id: topicId });
        return this.getAllByTopic(topic);
    }

    getAllByTopic(topic) {

        let articleIds = [];

        _.forEach(topic.articlesByCategory, (category) => {
            _.forEach(category.articleIds, (articleId) => {
                articleIds.push(articleId);
            })
        })

        return Articles.find({
            _id: { "$in": articleIds }
        }).fetch();
    }

}