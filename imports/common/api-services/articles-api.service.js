import { Articles } from '/imports/api/articles';
import { Topics } from '/imports/api/topics';

export default class ArticlesApi {

    constructor() {
        'ngInject';
    }

    getByTopicId(topicId) {
        let topic = Topics.findOne({ _id: topicId });
        return this.getAllByTopic(topic);
    }

    getByTopic(topic) {
        return Articles.find({
            _id: { "$in": topic.articleIds }
        }).fetch();
    }

    getByIds(idArray) {
        return Articles.find({ "_id": { "$in": idArray } }).fetch();
    }

}